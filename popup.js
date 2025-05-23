document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const repoList = document.getElementById('repoList');
  const apiTokenInput = document.getElementById('apiToken');
  const saveTokenButton = document.getElementById('saveToken');
  const repoCount = document.getElementById('repoCount');
  const keywordSuggestions = document.getElementById('keywordSuggestions');
  const copyNotification = document.getElementById('copyNotification');
  let allRepositories = [];
  let apiToken = '';
  let debounceTimer;

  // Suggested keywords based on repository data
  const suggestedKeywords = [
    'javascript',
    'python',
    'react',
    'vue',
    'angular',
    'node',
    'express',
    'django',
    'flask',
    'spring',
    'docker',
    'kubernetes',
    'aws',
    'azure',
    'gcp',
    'machine-learning',
    'ai',
    'data-science',
    'web',
    'mobile',
    'api',
    'database',
    'security',
    'testing',
  ];

  // Initialize keyword suggestions
  function initializeKeywordSuggestions() {
    keywordSuggestions.innerHTML = '';
    suggestedKeywords.forEach(keyword => {
      const tag = document.createElement('span');
      tag.className = 'keyword-tag';
      tag.textContent = keyword;
      tag.addEventListener('click', () => {
        searchInput.value = keyword;
        debouncedSearch(keyword);
      });
      keywordSuggestions.appendChild(tag);
    });
  }

  // Load saved API token
  chrome.storage.local.get(['githubToken'], result => {
    if (result.githubToken) {
      apiToken = result.githubToken;
      apiTokenInput.value = '********'; // Show masked token
      loadPersonalRepositories();
    } else {
      loadAllRepositories();
    }
  });

  // Save API token
  saveTokenButton.addEventListener('click', () => {
    const token = apiTokenInput.value.trim();
    if (token) {
      apiToken = token;
      chrome.storage.local.set({ githubToken: token }, () => {
        apiTokenInput.value = '********';
        loadPersonalRepositories();
      });
    }
  });

  // Function to fetch personal repositories
  async function loadPersonalRepositories() {
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${apiToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch personal repositories');
      }

      allRepositories = await response.json();
      displayRepositories(allRepositories);
      updateRepoCount(allRepositories.length);
    } catch (error) {
      console.error('Error fetching personal repositories:', error);
      repoList.innerHTML =
        '<div class="error">Error loading repositories. Please check your API token.</div>';
    }
  }

  // Function to fetch all repositories from GitHub API
  async function loadAllRepositories() {
    try {
      const response = await fetch('https://api.github.com/repositories');
      allRepositories = await response.json();
      displayRepositories(allRepositories);
      updateRepoCount(allRepositories.length);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      repoList.innerHTML =
        '<div class="error">Error loading repositories. Please try again later.</div>';
    }
  }

  // Debounce function
  function debounce(func, wait) {
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(debounceTimer);
        func(...args);
      };
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(later, wait);
    };
  }

  // Function to update repository count
  function updateRepoCount(count) {
    repoCount.textContent = `${count} repositories found`;
  }

  // Function to search repositories by name
  function searchRepositories(query) {
    if (!query.trim()) {
      displayRepositories(allRepositories);
      updateRepoCount(allRepositories.length);
      return;
    }

    const filteredRepos = allRepositories.filter(
      repo =>
        repo.name.toLowerCase().includes(query.toLowerCase()) ||
        repo.full_name.toLowerCase().includes(query.toLowerCase())
    );
    displayRepositories(filteredRepos);
    updateRepoCount(filteredRepos.length);
  }

  // Function to show copy notification
  function showCopyNotification() {
    copyNotification.classList.add('show');
    setTimeout(() => {
      copyNotification.classList.remove('show');
    }, 2000);
  }

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopyNotification();
  }

  // Function to display repositories
  function displayRepositories(repositories) {
    repoList.innerHTML = '';

    if (repositories.length === 0) {
      repoList.innerHTML = '<div class="no-results">No repositories found</div>';
      return;
    }

    repositories.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.className = 'repo-item';

      // Create star and fork emojis with proper encoding
      const starEmoji = '\u{2B50}'; // ⭐
      const forkEmoji = '\u{1F4BB}'; // 💻

      repoElement.innerHTML = `
        <div class="repo-name">${repo.full_name}</div>
        <div class="repo-description">${repo.description || 'No description available'}</div>
        <div class="repo-stats">
          <span>${starEmoji} ${repo.stargazers_count}</span>
          <span>${forkEmoji} ${repo.forks_count}</span>
        </div>
        <button class="copy-button" data-url="${repo.html_url}">Copy Link</button>
      `;

      // Add click event to open repository
      repoElement.addEventListener('click', e => {
        // Don't open if clicking on the copy button
        if (!e.target.classList.contains('copy-button')) {
          window.open(repo.html_url, '_blank');
        }
      });

      // Add click event to copy button
      const copyButton = repoElement.querySelector('.copy-button');
      copyButton.addEventListener('click', e => {
        e.stopPropagation(); // Prevent repository click event
        copyToClipboard(repo.html_url);
      });

      repoList.appendChild(repoElement);
    });
  }

  // Debounced search function
  const debouncedSearch = debounce(query => {
    searchRepositories(query);
  }, 300);

  // Initialize keyword suggestions
  initializeKeywordSuggestions();

  // Event listener for search input
  searchInput.addEventListener('input', e => {
    const query = e.target.value.trim();
    debouncedSearch(query);
  });

  // Event listener for search button
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    debouncedSearch(query);
  });

  // Event listener for Enter key
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      debouncedSearch(query);
    }
  });
});

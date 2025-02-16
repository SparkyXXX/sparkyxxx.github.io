window.addEventListener('load', function () {
  const loadingContainer = document.querySelector('.loading-container');
  const mainContent = document.querySelector('.main-container');
  console.log('页面加载完成');
  loadingContainer.style.display = 'none';
  mainContent.style.display = 'block';
});

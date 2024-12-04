document.getElementById('weight-loss-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  
  fetch(`/weights/weight-loss?start=${startDate}&end=${endDate}`)
      .then(response => response.json())
      .then(data => {
          const resultDiv = document.getElementById('weight-loss-result');
          resultDiv.innerHTML = `Weight Loss: ${data.weightLoss} kg`;
      })
      .catch(err => console.error(err));
});

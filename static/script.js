document.getElementById('oa-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        age: document.getElementById('age').value,
        bmi: document.getElementById('bmi').value,
        oa_severity: document.getElementById('oa_severity').value,
        activity: document.getElementById('activity').value,
        smoking: document.getElementById('smoking').value,
        pain_score: document.getElementById('pain_score').value
    };

    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = 'Comorbidity Risk: ' + (data.comorbidity ? 'High' : 'Low');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

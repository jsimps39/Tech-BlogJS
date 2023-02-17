const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const nameEl = document.querySelector('#name-input');
    const descriptionEl = document.querySelector('#description-input');
  
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ nameEl, descriptionEl}),
      //   name: nameEl.value,
      //   description: descriptionEl.value,
      // }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to post');
    }
  };
  
  document
    .querySelector('#post-form') //post-form?
    .addEventListener('submit', signupFormHandler);
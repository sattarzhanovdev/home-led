const tv = document.querySelector('.tv')
const polka = document.querySelector('.polka')

tv.addEventListener('click', e => {
  e.preventDefault()
  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'tv',
      r: 255,
      g: 255,
      b: 255,
      count: 350
    })
  })
  .then(() => window.open('./tv.html', '_self'))
})

polka.addEventListener('click', e => {
  e.preventDefault()

  fetch('https://631afc8ddc236c0b1ee91ae6.mockapi.io/api/v1/value/1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'polka',
      r: 255,
      g: 255,
      b: 255,
      count: 120
    })
  }).then(() => window.open('./polka.html', '_self'))
})

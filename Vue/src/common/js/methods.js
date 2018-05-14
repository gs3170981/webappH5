((D) => {
  setTimeout(r => {
    let item = D.getElementsByClassName("row-item")
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener('touchstart', e => {
        console.log(e.target)
      })
    }
  }, 20)
})(document)

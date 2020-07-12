class Movie {
  constructor(title, date, rating) {
    this.title = title;
    this.date = date;
    this.rating = rating;
  }
}
// Local Storage

function removeFromLS(taskItem){
  console.log(taskItem);

  let title = taskItem.children[0].innerHTML;
  moviesArr = JSON.parse(localStorage.getItem('movie'));
  for(i=0; i<moviesArr.length; i++){
    if(title  === moviesArr[i].title){
      moviesArr.splice(i, 1);
    }
  }

  localStorage.setItem('movie', JSON.stringify(moviesArr));
}

function passToLS(title, releaseYear, rating, key){
  const userMovie = new Movie(title, releaseYear, rating);
  console.log(userMovie);
  let values = JSON.parse(localStorage.getItem(key));
  if(values === null){
    values = [];
  }

  values.push(userMovie);
  localStorage.setItem(key, JSON.stringify(values));
  console.log(localStorage.getItem(key));
}

function getFromLS(){
  let values;
  if(localStorage.getItem('movie') === null){
    values = [];
  } else {
    values = JSON.parse(localStorage.getItem('movie'));

  }
  arr = values.length;
  let i;
  for(i = 0; i < arr; i++){
    title = values[i].title;
    date = values[i].date;
    rating = values[i].rating;
    addRow(title, date, rating);
  }
}


function removeRow(e){
  const del = e.target;
  if(del.className === 'delete-item'){
    pass = del.parentElement;
    console.log(pass);
    del.parentElement.remove();
    removeFromLS(pass);
  }
}


function addRow(title, releaseYear, rating){
  table = document.querySelector('.table');

  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("a")
  var row = document.createElement("tr");
  
  td1.innerHTML = title;
  td2.innerHTML = releaseYear;
  td3.innerHTML = rating;
  td4.className = 'delete-item';
  td4.href = '#';
  td4.innerHTML = 'X';
  console.log(td4);
  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  table.children[0].appendChild(row);
}

function movieTitle(e) {
  if(document.querySelector('.userTitle').value != ''){
    let userTitle = document.querySelector('.userTitle').value;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `http://www.omdbapi.com/?t=${userTitle}&apikey=d096177b`, true);
    xhr.onload = function(){
      if(this.status === 200) {
        const response = JSON.parse(this.responseText);
        let title = response.Title,
            releaseYear = response.Year,
            rating = response.imdbRating;
        let key = 'movie';
        // console.log(title, releaseYear, rating);
        if(title === undefined || releaseYear === undefined || rating === undefined){
          alert(`${userTitle} is not a film`);
        } else {
          addRow(title, releaseYear, rating);
          passToLS(title, releaseYear, rating, key);
        }
      }
    }
    document.querySelector('.userTitle').value = '';
    xhr.send();
    e.preventDefault();
  } else {
    alert('input movie title');
    e.preventDefault();
  }
}

window.onload = function(){
  console.log('hey');
  document.querySelector('.test').addEventListener('click', movieTitle);
  getFromLS();
  document.querySelector('.table').addEventListener('click', removeRow);
}

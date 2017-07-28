// Need access to the url
var FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
// Need key to access to the content
var FLICKR_API_KEY = '05a835f1f0f90f69411e2af9cb71f876';

// Create one variable for each of the DOM elements that we will need to target later
var app = document.querySelector('#app');
var mainApp = document.querySelector('.main-app');
var photoForm = app.querySelector('.search-area');
var photoInput = photoForm.querySelector('#phototype-input');
var getPhotoButton = photoForm.querySelector('.get-picture-button');
var searchResult = app.querySelector('.search-result');
var troublePart = document.getElementById('trouble');

function getPhotosForSearch(keyWord){ // keyWord is the search term, this function will return an array of photo objects
  // This is the ES6 template string for the url
  var url = `${FLICKR_API_URL}?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${FLICKR_API_KEY}&text=${keyWord}`;

  return(
    fetch(url)
    .then(response => response.json())
    .then(data => data.photos.photo)
  );
  // Until here, I get the array of tons of pictures
}

//event handler for submit
photoForm.addEventListener('submit', function(event){
  event.preventDefault();

  var keywordSearch = photoInput.value;

  getPhotosForSearch(keywordSearch).then((photos) => {

// For this step, I'm going to make it return an array of objects where each picture has it's own url. Use map function cause I need to return an array

var clearSearchDiv = document.querySelector('#phototype-input').value = "";
var clearImageDiv = document.getElementById('trouble').innerHTML= "";

photos.map((photo) => {
      // define the url for each photo.

      var thumbPhotoURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;
      var largePhotoURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
      var mediumPhotoURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;

      // photo.thumpSmall = thumbPhotoURL
      // photo.thumbMedium = ...

      var newObj = {
        thumb: thumbPhotoURL,
        large: largePhotoURL,
        title: photo.title
      };

      var a = document.createElement('a')
      a.setAttribute('href', newObj.large)
      a.setAttribute('target', '_blank')

      var clearImageDiv = document.getElementsByTagName('img').innerHTML = "";

      var img = document.createElement('img')
      img.setAttribute('src', newObj.thumb)

      a.appendChild(img)

      troublePart.appendChild(a)

      return newObj;

    })

  })
})




/*flickr key


secret
15e9e9431572a9ad


//Access to the URL & Unique API key- set as variables for easy implementation during the request
var FLICKR_API_URL = 'https://api.flickr.com/services/rest/';
//generated after signing up for Flickr
var FLICKR_API_KEY= '05a835f1f0f90f69411e2af9cb71f876';

//create the DOM elements (we will target these later)
var app = document.querySelector('#app');
var mainApp = document.querySelector('.main-app');
var photoForm = app.querySelector('.search-area');
var photoInput = photoForm.querySelector('.phototype-input');
var getPhotoButton = photoForm.querySelector('.get-picture-button');
var searchResult = app.querySelector('.search-result');
var troublePart = document.getElementById('trouble');


//create a function that searches for photos by keyword, this function will return an array of photo objects

function getPhotosForSearch(keyWord) {
//ES6 template string for the URL-
 var url = `${FLICKR_API_URL}?method=flickr.photos.search&format=json&nojsoncallback=1&api_key=${FLICKR_API_KEY}&text=${keyWord}`;
 return(
   fetch(url)
   .then(response => response.json())
   .then(photo => photo.photos.photo)
 );
//this should return an array of photos
}

//create an event for the photo input value
photoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var keywordSearch = photoInput.value;

  //set up the promise for the keyword search
  getPhotosForSearch(keywordSearch).then((photos) => {

    //these variables will clear the search value and set the value as an empty string
    var clearSearchDiv = document.querySelector('.phototype-input').value = "";
    var clearImageDiv = document.getElementById('trouble').innerHTML = "";

      //using map function, we will return an array object with each picture's own url. the map function will return a new array.
    photos.map((photo) => {
      //define the URL of each photo: thumbnail, large, medium
      //thumbnail
      var thumbPhotoURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`;
      var largePhotoURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
      var mediumPhotoURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_z.jpg`;


      var newObj = {
        thumb: thumbPhotoURL,
        large: largePhotoURL,
        title: photo.title
      };

      //set up the image as an a link
      var a = document.createElement('a');
      a.setAttribute('href', newObj.large)
      a.setAttribute('target', '_blank')

      var clearImageDiv = document.getElementsByTagName('img').innerHTML = "";

      var img = document.createElement('img')
      img.setAttribute('src', newObj.thumb)

      a.appendChild(img)

      troublePart.appendChild(a)

      return newObj;

    })
  })
})

getPhotosForSearch();

*/

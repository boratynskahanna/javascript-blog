'use strict';

// Title Click 
const titleClickHandler = function(event){ 
  event.preventDefault();
  const clickedElement = this; 
  console.log('Link was clicked!');
  
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};
  
// Constant

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles', 
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';

// Generate Title Links  
  
const generateTitleLinks = function(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for(let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id');
  
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
    /* get the title from the title element */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

    /* create HTML of the link */
    html = html + linkHTML; 
  }
  /* insert link into titleList */
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};
  
generateTitleLinks(); 

// Generate Tags

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      
      /* generate HTML of the link */
      const linkHTML = `<li><a href='#tag-${tag}'>${tag}</a></li>`; 
     
      /* add generated code to html variable */
      html = html + linkHTML + " ";

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1) {
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }

    /* END LOOP: for each tag */
    }
    
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    
  /* END LOOP: for every article: */
  }
  
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
};

generateTags();

// Handling Tag Click

const tagClickHandler = function(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler)
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// Author Click Handler

const authorClickHandler = function(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#tag-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for(let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

// Click Listeners to Authors

const addClickListenersToAuthors = function() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('.post-author a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler)
  /* END LOOP: for each link */
  }
}

// Generate Authors

const generateAuthors = function() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-author attribute */
    const authorTag = article.getAttribute('data-author');

    /* insert HTML of all the links into the tags wrapper */
    const linkHTML = `<a href='#tag-${authorTag}'>${authorTag}</a>`; 
    html = linkHTML;
    authorWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
  addClickListenersToAuthors();
};

generateAuthors();


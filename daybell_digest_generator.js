// This embeds the latest Daybell Digest article onto anyone's website.
// For convenience, the code we will give out will be <div id="ein_article"></div> and a link to this script

// Where we're putting the elements
const ein_article_destination = document.getElementById("ein_article"); 
let ein_host_head_element = document.getElementsByTagName('head');
ein_host_head_element = ein_host_head_element[0];


// Let's get the articles from the WordPress API

let categoryId = 33657;
let feed = 'https://www.eastidahonews.com/wp-json/wp/v2/posts?_embed&per_page=1&categories=';
feed += categoryId;



function get_ein_article(feed){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",feed,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

// Get all elements
const json_obj = JSON.parse(get_ein_article(feed));
const ein_headline = json_obj[0].title.rendered;
const ein_byline = json_obj[0].meta_fields._dc_author[0];
const ein_featured_image = json_obj[0]._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
/* const ein_mp4_video = json_obj[0].meta_fields.media_mp4;*/
const ein_youtube = json_obj[0].meta_fields.media_embed_code;
const ein_article_content = json_obj[0].content.rendered;
const ein_link = json_obj[0].link;
let ein_published_date = json_obj[0].date;
let ein_modified_date = json_obj[0].modified;

// Date and time

// Get ISO format of dates

if (!ein_modified_date) {
	ein_modified_date = ein_published_date;
}

ein_published_date= new Date(ein_published_date);
ein_modified_date = new Date(ein_modified_date);

const ein_date_options = { dateStyle: 'long', timeStyle: 'short', };

let ein_published_date_formatted = new Intl.DateTimeFormat('en-US', ein_date_options).format(ein_published_date);
let ein_modified_date_formatted = new Intl.DateTimeFormat('en-US', ein_date_options).format(ein_modified_date);


console.log("published at " + ein_published_date_formatted);
console.log("modified at " + ein_modified_date_formatted);


const ein_modified_date_element = document.createElement("div");
ein_modified_date_element.className = 'ein_modified_date';
ein_modified_date_element.innerHTML = "Last modified " + ein_modified_date_formatted;



//let ein_published_date_day = ein_published_date.getDay();




ein_fragment = document.createDocumentFragment(); // We'll put everything into a fragment first, then append so it all loads at once.

// featured image and video
let ein_featured_image_element;

if (ein_youtube) {
	  ein_featured_image_element = document.createElement("div");
    ein_featured_image_element.innerHTML = ein_youtube;
}


/* if (ein_mp4_video) {
  ein_featured_image_element = document.createElement("video");
  ein_featured_image_element.controls = true;
  ein_featured_image_element.poster = ein_featured_image; */
  
	//ein_video_source_element = document.createElement('source');
  //ein_video_source_element.src = ein_youtube;
  //ein_video_source_element.type = "application/x-mpegURL";
  
  
	// ein_featured_image_element.innerHTML += "<source src='" + ein_mp4_video + "' type='application/x-mpegURL'>";
// }
else {
  ein_featured_image_element = document.createElement("img");
  ein_featured_image_element.src = ein_featured_image;
}




// headline
const ein_headline_element = document.createElement("h2");


ein_ads_body = `
<!-- /22701698660/ein-embed-leaderboard-1 -->
<div id='div-gpt-ad-1680888905474-0' class='ein_ad' style='min-width: 320px; min-height: 50px;'>
  <script>
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1680888905474-0'); });
	console.log('pushing ad!');
  </script>
</div>
`;
ein_headline_element.innerHTML = ein_ads_body + ein_headline;

// byline
const ein_byline_element = document.createElement("p");
ein_byline_element.className = "ein_author";
ein_byline_element.innerHTML = "By " + ein_byline;

// link
const ein_link_element = document.createElement("p");
ein_link_element.className = "ein_link";
ein_link_element.innerHTML = "This was <a href='" + ein_link + "' target='_blank'>first published</a> on EastIdahoNews.com. Get more in-depth articles on this case <a href='https://www.eastidahonews.com/news/daybell/'>here</a>.";


// article
ein_ads_body = `
<!-- /22701698660/ein-embed-leaderboard-1 -->
<div id='div-gpt-ad-1680888905474-0' class='ein_ad' style='min-width: 320px; min-height: 50px;'>
  <script>
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1680888905474-0'); });
	console.log('pushing ad!');
  </script>
</div>
`;
const ein_article_content_element = document.createElement("div");
ein_article_content_element.innerHTML = ein_article_content;


// Put all the elements in the order we want them in this array.
const ein_created_elements = [
	ein_headline_element, 
	ein_byline_element, 
	ein_modified_date_element,  
	ein_featured_image_element, 
	ein_article_content_element,
	ein_link_element,
];

for (i = 0; i < ein_created_elements.length; i++) {
	ein_fragment.appendChild(ein_created_elements[i]);
}

/* Styles */
ein_style = `
	#ein_article {
		max-width: 900px;
		margin: 0 auto;
		padding: 10px;
	} 

	#ein_article img {
		width: 100%;
		height: auto;
	}

	#ein_article .cutline, #ein_article .caption, #ein_article .ein_link { 
		font-style: italic; 
		font-size: 90%;
	}

	#ein_article .cutline {
		margin-top: -10px;
	}

	#ein_article .ein_author {
		font-weight: bold;
		font-size: 90%;
	}

	#ein_article .ein_modified_date {
		font-style: italic;
		font-size: 85%;
		margin-bottom: 10px;
	}

	#ein_article .videowrapper  {
		float: none; 
		clear: both; 
		width: 100%; 
		position: relative; 
		padding-bottom: 56.25%; 
		padding-top: 25px; 
		height: 0; 
		margin-bottom: 30px;
	}
	
	#ein_article .videowrapper iframe { 
		position: absolute; 
		top: 5px; 
		left: 0; 
		width: 100%; 
		height: 100%;
	}

	.ein_ad {
		text-align: center;
	}
`;

ein_style_element = document.createElement("style");
ein_style_element.innerHTML = ein_style;

ein_style_fragment = document.createDocumentFragment();
ein_style_fragment.appendChild(ein_style_element);


/* Place ads */

ein_ads_gpt_tag_element = document.createElement("script");
ein_ads_gpt_tag_element.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
ein_ads_gpt_tag_element.async = true;

ein_ads_define_element = document.createElement("script");


ein_ads_fragment = document.createDocumentFragment();
ein_ads_fragment.appendChild(ein_ads_gpt_tag_element);
//ein_ads_fragment.appendChild(ein_ads_define_element);




ein_ads = `
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
  window.googletag = window.googletag || {cmd: []};
  googletag.cmd.push(function() {
	console.log('embedded ad activated');
    googletag.defineSlot('/22701698660/ein-embed-leaderboard-1', [[728, 90], [320, 50]], 'div-gpt-ad-1680888905474-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>
`;

/* Append all the things - styles first so everything is formatted correctly as it comes in */
ein_host_head_element.appendChild(ein_style_fragment);
ein_host_head_element.appendChild(ein_ads_fragment);
ein_article_destination.appendChild(ein_fragment);

/* ein_article_destination.appendChild(ein_featured_image_element);
ein_article_destination.appendChild(ein_headline_element); */

/* 
var css = 'h1 { background: red; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
*/
 

document.addEventListener("DOMContentLoaded", ein_loadAds());

function ein_loadAds() {
	window.googletag = window.googletag || {cmd: []};
googletag.cmd.push(function() {

	var mappingFooterboard = googletag.sizeMapping().
	addSize([768, 350], [728, 90]).
	addSize([1, 1 ], [320, 50]).
	build();
	

	googletag.defineSlot('/22701698660/ein-embed-leaderboard-1', [[728, 90], [320, 50]], 'div-gpt-ad-1680888905474-0').defineSizeMapping(mappingFooterboard).addService(googletag.pubads());
	googletag.pubads().enableSingleRequest();
	googletag.enableServices();
});
	googletag.cmd.push(function() { googletag.display('div-gpt-ad-1680888905474-0'); });
}

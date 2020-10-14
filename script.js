'use strict';

const apiKey = "QMaBJj8D6giUgcOuGFBUJksec2riTrTgQpvx1C6b";

const apiURL = "https://developer.nps.gov/api/v1/parks";




function stringCreate(params) {

	//const stringItem = Object.keys(params)
	//.map(key => `${encodeURIComponet(key)}=${encodeURIComponet(params[key])}`)
	const stringItem = Object.keys(params).map(key =>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

		console.log(stringItem.join('&'));

		return stringItem.join('&');
}


function showOnSite(responseJson) {

	console.log("showOnSite Ran");
	console.log(responseJson.data[0]);

	$('#js-results').empty();
//Full name X
//Description X
//website url X
//bonus parks adress
//need to set max number of results default to 10

// blocking for loop for testing
for (let i = 0; i < responseJson.data.length; i++) {

		$('#js-results').append(
			`
			<div class="searchBox">
			<ul>
				<li class="parkName">${responseJson.data[i].fullName}</li>
				<li>Description: ${responseJson.data[i].description}</li>
				<li><A href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a>
				<li>Address:
				<br>
				${responseJson.data[i].addresses[0].line1}<br>
				${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}<br>


			</ul>
			<br>
			</div>
			`);

}

	

}





function npsApi(search, totalSearch) {

	console.log("npsApi Started");

	const params = {
		limit: totalSearch,
		q: search
	};

	const searchString = stringCreate(params);
	const searchUrl = apiURL + '?' + searchString;

	console.log(searchUrl);

	const apiOptions = {
		headers: new Headers({
			"X-Api-Key": apiKey
		})
	}

	console.log(apiKey);
	console.log(apiURL);

	fetch(searchUrl, apiOptions)
		.then(response => {
			if (response.ok) {
				console.log("NPS API Response was OK!")
				return response.json();
			}
			throw new Error(response.statusText);
			//responsse.json())
		})
		.then(responseJson => showOnSite(responseJson))
		.catch(err => {
			console.log("***********CATCH ERROR**********");
			let errorMsg = `${err.message}`;
			console.log(errorMsg);
		})



}



function submitButton() {

	$('form').submit(event => {
		event.preventDefault();
		console.log("Submit Activated");

		const stringParam = $('#searchBox').val();
		const totalSearch = $('#searchTotal').val();

		console.log(totalSearch);
		console.log(typeof(totalSearch));
		let convertTotalSearch = parseInt(totalSearch);
		console.log(typeof(convertTotalSearch));
		npsApi(stringParam, convertTotalSearch);
	})

}


function all() {

	submitButton();

}


$(all);
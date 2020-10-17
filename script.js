'use strict';

const apiKey = "QMaBJj8D6giUgcOuGFBUJksec2riTrTgQpvx1C6b";

const apiURL = "https://developer.nps.gov/api/v1/parks";

const stateCodes = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'];



for (let i = 0; i < stateCodes.length; i++) {
		let stateHtml = document.getElementById('state');
		stateHtml.innerHTML += '<option value="' + stateCodes[i].toLowerCase() + '">' + stateCodes[i] +'</option>';

}


function stringCreate(params) {


	const stringItem = Object.keys(params).map(key =>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

		console.log(stringItem.join('&'));

		return stringItem.join('&');
}


function showOnSite(responseJson) {

	console.log("showOnSite Ran");
	console.log(responseJson.data[0]);

	$('#js-results').empty();






		let totalResutlsHtml = document.getElementById('totalResutls');
		totalResutlsHtml.innerHTML = `Total Number of Resutls: ` + responseJson.data.length;

for (let i = 0; i < responseJson.data.length; i++) {


		$('#js-results').append(
			`
			<div class="searchBox">
			<ul>
				<li class="parkName">${responseJson.data[i].fullName}</li>
				<li>Description: ${responseJson.data[i].description}</li>
				<li><A href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a>
			
				<!-- address code here -->
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





function npsApi(search, totalSearch, states) {

	console.log("npsApi Started");






if (search.length < 1 ) {

	let params = {
		limit: totalSearch

	};
	console.log("if passed");
	console.log(params);


	const searchString = stringCreate(params);
	console.log(searchString);
	const searchUrl = apiURL + '?' + 'stateCode=' + states + '&' + searchString;
	console.log(searchUrl);


const apiOptions = {
		headers: new Headers({
			"X-Api-Key": apiKey
		})
	}



	fetch(searchUrl, apiOptions)
		.then(response => {
			if (response.ok) {
				console.log("NPS API Response was OK!")


				return response.json();
			
			}
			throw new Error(response.statusText);
			responsse.json()

			
		})
		.then(responseJson => showOnSite(responseJson))
		.catch(err => {
			console.log("***********CATCH ERROR**********");
			let errorMsg = `${err.message}`;
			console.log(errorMsg);
		})


}

else {
		let params = {

		limit: totalSearch,
		q: search
		
		
	};

		console.log(params);


	const searchString = stringCreate(params);
	console.log(searchString);
	const searchUrl = apiURL + '?' + 'stateCode=' + states + '&' + searchString;
	console.log(searchUrl);


const apiOptions = {
		headers: new Headers({
			"X-Api-Key": apiKey
		})
	}



	fetch(searchUrl, apiOptions)
		.then(response => {
			if (response.ok) {
				console.log("NPS API Response was OK!")


				return response.json();
			
			}
			throw new Error(response.statusText);
			responsse.json()

			
		})
		.then(responseJson => showOnSite(responseJson))
		.catch(err => {
			console.log("***********CATCH ERROR**********");
			let errorMsg = `${err.message}`;
			console.log(errorMsg);
		})
	console.log("else passed");
}









}



function submitButton() {

	$('form').submit(event => {
		event.preventDefault();
		console.log("Submit Activated");

		const stringParam = $('#searchBox').val();
		const totalSearch = $('#searchTotal').val();
		const stateCode = $('#state').val();

		console.log("This is the State Code: " + stateCode);
		console.log("This is the search box value: " + stringParam);
		let convertStateCode = (stateCode.join(','))
		let convertTotalSearch = parseInt(totalSearch);

		if (stringParam === '') {
			console.log("Search Passed to the if statement");
		}
		

		npsApi(stringParam, convertTotalSearch, convertStateCode);
	})

}


function all() {

	submitButton();

}


$(all);
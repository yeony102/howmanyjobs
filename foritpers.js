(function () {

	let xmlhttp = new XMLHttpRequest();
	let itpJobs;
	let currentJob;
	let currentState;

	xmlhttp.open('GET', 'data/foritpers.json', true);
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				itpJobs = JSON.parse(xmlhttp.responseText);
				getUStotals();
			}
		}
	};
	xmlhttp.send(null);

	function getUStotals() {

		for (let job in itpJobs) {
			let total = 0;

			for (let state in itpJobs[job]) {
				total += itpJobs[job][state];
			}
			itpJobs[job]["the US"] = total;
		}
	}

	function colourMap(job) {

		let theJob = itpJobs[job];
		let avg = theJob["the US"] / 50;
		console.log("The average number of " + job + " positions: " + avg);

		for (key in stateCode) {

			let s = document.getElementById('us-map2').getElementById(key);

			if (theJob[stateCode[key]] > (avg * 2)) {
				s.setAttribute('fill', 'rgb(255,255,255,1)');
				s.setAttribute('stroke', 'rgb(255,255,255,0.7)');
				s.setAttribute('stroke-width', '0.5px');
			} else if (theJob[stateCode[key]] > (avg * 1.5)) {
				s.setAttribute('fill', 'rgb(255,255,255,0.8)');
				s.setAttribute('stroke', 'rgb(255,255,255,0.7)');
				s.setAttribute('stroke-width', '0.5px');
			} else if (theJob[stateCode[key]] > avg) {
				s.setAttribute('fill', 'rgb(255,255,255,0.6)');
				s.setAttribute('stroke', 'rgb(255,255,255,0.7)');
				s.setAttribute('stroke-width', '0.5px');
			} else if (theJob[stateCode[key]] > (avg * 0.5)) {
				s.setAttribute('fill', 'rgb(255,255,255,0.4)');
				s.setAttribute('stroke', 'rgb(255,255,255,0.7)');
				s.setAttribute('stroke-width', '0.5px');
			} else {
				s.setAttribute('fill', 'rgb(255,255,255,0.2)');
				s.setAttribute('stroke', 'rgb(255,255,255,0.7)');
				s.setAttribute('stroke-width', '0.5px');
			}

		}
	}


	function resetTitles(job) {

		let jobTitle = document.getElementById('thisJob');
		let jobNum = document.getElementById('thisJob_num');
		let jobLoc = document.getElementById('thisJob_loc');

		let jobName;
		let numToString;

		if (job == 0) {
			jobName = 'Multimedia Designer';
			jobTitle.parentNode.style.marginTop = '90px';

		} else if (job == 1) {
			jobName = 'Software Developer';
			jobTitle.parentNode.style.marginTop = '90px';

		} else if (job == 2) {
			jobName = 'UX Designer';
			jobTitle.parentNode.style.marginTop = '130px';
		}

		let num = itpJobs[jobName]["the US"];
		numToString = numberWithCommas(num);

		jobTitle.innerHTML = jobName.toUpperCase();
		jobNum.innerHTML = numToString;
		jobLoc.innerHTML = 'the US';
	}


	function multDesClicked(e) {
		let img = document.getElementById('bgImage')
		img.src = 'images/creative_artist.png';
		currentJob = 'Multimedia Designer';

		let currentClass = img.classList[0];

		console.log(currentClass);

		if (currentClass != 'firstImg') {
			img.classList.remove(currentClass);
			img.classList.add('firstImg');
			resetTitles(0);
		}
		colourMap('Multimedia Designer');
	}

	function swDevClicked(e) {
		let img = document.getElementById('bgImage')
		img.src = 'images/software_developer.jpg';
		currentJob = 'Software Developer';

		let currentClass = img.classList[0];

		console.log(currentClass);

		if (currentClass != 'secondImg') {
			img.classList.remove(currentClass);
			img.classList.add('secondImg');
			resetTitles(1);
		}
		colourMap('Software Developer');
	}

	function uxDesClicked(e) {
		let img = document.getElementById('bgImage')
		img.src = 'images/ux_designer.jpeg';
		currentJob = 'UX Designer';

		let currentClass = img.classList[0];

		console.log(currentClass);

		if (currentClass != 'thirdImg') {
			img.classList.remove(currentClass);
			img.classList.add('thirdImg');
			resetTitles(2);
		}
		colourMap('UX Designer');
	}


	// Add Event Listeners to the job menus on 'FOR ITPERS' page
	document.getElementById('mult_des').addEventListener('click', multDesClicked, false);
	document.getElementById('sw_dev').addEventListener('click', swDevClicked, false);
	document.getElementById('ux_des').addEventListener('click', uxDesClicked, false);

	function updateStateInfo(state, total) {
		let stateName = document.getElementById('thisJob_loc');
		let nJobs = document.getElementById('thisJob_num');

		stateName.innerHTML = state;
		nJobs.innerHTML = numberWithCommas(total);

	}

	function stateClicked(e) {

		let existing = document.getElementsByClassName('selectedPath');
		if (existing[0]) {
			existing[0].classList.remove('selectedPath');
		}

		if (currentState == stateCode[e.target.id]) {
			currentState = 'the US';
			updateStateInfo(currentState, numberWithCommas(itpJobs[currentJob][currentState]));
		} else {
			e.target.setAttribute('class', 'selectedPath');
			currentState = stateCode[e.target.id];
			updateStateInfo(currentState, numberWithCommas(itpJobs[currentJob][currentState]));
		}
	}

	// Add Event Listeners to the map on #s4
	let p = document.getElementById('s4').getElementsByTagName('path');
	for (let i = 0; i < p.length; i++) {

		// Mouse over: the state name appears 
		p[i].addEventListener('mouseover', function (e) {

			let state;
			for (key in stateCode) {
				if (key == this.id) {
					state = stateCode[key];
					break;
				}
			}
			let info = document.getElementById('state-info');
			info.innerHTML = state;
			info.style.top = (e.pageY - 30) + 'px';
			info.style.left = (e.pageX - 10) + 'px';
			info.style.opacity = 1;

			// The State name text follows the cursor while the it is in the state's territory.
			document.addEventListener('mousemove', function (e) {
				info.style.top = (e.pageY - 30) + 'px';
				info.style.left = (e.pageX - 10) + 'px';
			}, false);

		}, false);

		// Mouse Out: the state name disappears
		p[i].addEventListener('mouseout', function (e) {

			let info = document.getElementById('state-info');
			info.style.opacity = 0;
			document.removeEventListener('mousemove', function (e) { }, false);

		}, false);

		// Click: Show the job information of the state
		p[i].addEventListener('click', stateClicked, false);

	}
})();
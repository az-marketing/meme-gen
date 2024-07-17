'use client'

import React, { useEffect, useState, useRef } from 'react';
import './Meme.css';
import socialSq from '../Meme/images/socials/scoreBoardSquare.jpg'
import socialFb from '../Meme/images/socials/scoreBoardFB.jpg'
import wilburSq from '../Meme/images/socials/wilburSquare.jpg'
import wilburFb from '../Meme/images/socials/wilburFB.jpg'
import wilmaSq from '../Meme/images/socials/wilmaSquare.jpg'
import wilmaFb from '../Meme/images/socials/wilmaFB.jpg'

import socialSqBlank from '../Meme/images/socials/scoreBoardSquareBlank.jpg'
import socialFbBlank from '../Meme/images/socials/scoreBoardFBBlank.jpg'
import wilburSqBlank from '../Meme/images/socials/wilburSquareBlank.jpg'
import wilburFbBlank from '../Meme/images/socials/wilburFBBlank.jpg'
import wilmaSqBlank from '../Meme/images/socials/wilmaSquareBlank.jpg'
import wilmaFbBlank from '../Meme/images/socials/wilmaFBBlank.jpg'

import ticketSq from '../Meme/images/socials/ticketSquare.jpg'
import ticketFb from '../Meme/images/socials/ticketFB.jpg'
import oldMainSq from '../Meme/images/socials/oldMainSquare.jpg'
import oldMainFb from '../Meme/images/socials/oldMainFB.jpg'
import fireworksSq from '../Meme/images/socials/fireworksSquare.jpg'
import fireworksFb from '../Meme/images/socials/fireworksFB.jpg'

import ticketSqBlank from '../Meme/images/socials/ticketSquareBlank.jpg'
import ticketFbBlank from '../Meme/images/socials/ticketFBBlank.jpg'
import oldMainSqBlank from '../Meme/images/socials/oldMainSquareBlank.jpg'
import oldMainFbBlank from '../Meme/images/socials/oldMainFBBlank.jpg'
import fireworksSqBlank from '../Meme/images/socials/fireworksSquareBlank.jpg'
import fireworksFbBlank from '../Meme/images/socials/fireworksFBBlank.jpg'

const Meme = () => {
	const [errorText, setErrorText] = useState('');
	const [name, setName] = useState('');
	const [bgImg, setBgImg] = useState(socialSq.src);
	const canvasRef = useRef(null);
	const linkRef = useRef(null);

	useEffect(() => {
		const myFont = new FontFace('myFont', 'url("https://use.typekit.net/af/0ff5e1/00000000000000003b9b3078/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")');
		myFont.load().then((font) => {
			document.fonts.add(font);
		});
	}, []);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			generateImage();
		}
	};

	const isProfanity = async (txt) => {
		try {
			const response = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(txt)}`);
			const result = await response.text();
			return result.trim().toLowerCase() === 'true';
		} catch (error) {
			console.error('Request failed', error);
			return false;
		}
	};

	const textInputErrCheck = async (txt) => {
		let errorText = '';
		const regex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ -]*$');
		let pass = true;
		const specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;

		if (txt.length <= 0 || txt.length > 19) {
			pass = false;
			errorText = 'Too long, name should be up to 19 characters';
		} else if (specialChars.test(txt)) {
			pass = false;
			errorText = 'Invalid Characters';
		} else if (!regex.test(txt)) {
			pass = false;
			errorText = 'Invalid Characters';
		}

		try {
			const isProfane = await isProfanity(txt);
			if (isProfane) {
				pass = false;
				errorText = 'Language';
			}
		} catch (error) {
			console.error('Error occurred while checking profanity:', error);
			return false;
		}

		setErrorText(errorText);
		return pass;
	};

	const generateImage = async () => {
		const txtPass = await textInputErrCheck(name);
		document.getElementById('canvasCont').classList.remove('hide');
		if (txtPass && bgImg) {
			const canvas = canvasRef.current;
			const canvasObj = new CanvasInstanceObj(name, bgImg);
			compileCanvas(canvasObj, canvas);
		}
	};

	const compileCanvas = (canvasObj, canvas) => {
		const ctx = canvas.getContext('2d');

		const background = new Image();
		background.src = canvasObj.bgImg.imgFile;

		background.onload = () => {
			// Set canvas dimensions to match image dimensions
			canvas.width = background.width;
			canvas.height = background.height;

			// Draw the background image
			ctx.drawImage(background, 0, 0);

			// Set font properties
			ctx.font = `bold ${canvasObj.textInput.fontSize}px myFont, sans-serif`;
			ctx.fillStyle = '#ffffff';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			console.log(canvasObj.bgImg.imgName);

			// Draw the text
			if (canvasObj.bgImg.imgName.includes('scor')) {
				if (canvasObj.bgImg.imgName.includes('FB')) {
					ctx.setTransform(1.1, 0.26, 0.02, 1.1, 0, 0);
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX + 690, canvasObj.bgImg.textY - 42, canvasObj.bgImg.textAreaWidth);
					ctx.setTransform(1, -0.5, 0.2, 1, 0, 0);
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX - 372, canvasObj.bgImg.textY + 690, canvasObj.bgImg.textAreaWidth);
				} else {
					ctx.setTransform(1.1, 0.26, 0.02, 1.1, 0, 0);
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX + 950, canvasObj.bgImg.textY + 150, canvasObj.bgImg.textAreaWidth);
					ctx.setTransform(1, -0.5, 0.2, 1, 0, 0);
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX - 900, canvasObj.bgImg.textY + 1000, canvasObj.bgImg.textAreaWidth);
				}
			} else if (canvasObj.bgImg.imgName.includes('wilbur')) {
				if (canvasObj.bgImg.imgName.includes('FB')) {
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX + 780, canvasObj.bgImg.textY + 150, canvasObj.bgImg.textAreaWidth);
				} else {
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.width - 90, canvasObj.bgImg.textY + 330, canvasObj.bgImg.textAreaWidth);
				}
			} else if (canvasObj.bgImg.imgName.includes('wilma')) {
				if (canvasObj.bgImg.imgName.includes('FB')) {
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX + 780, canvasObj.bgImg.textY + 150, canvasObj.bgImg.textAreaWidth);
				} else {
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.width - 90, canvasObj.bgImg.textY + 330, canvasObj.bgImg.textAreaWidth);
				}
			} else if (canvasObj.bgImg.imgName.includes('tick')) {
				ctx.textAlign = 'start';
				ctx.fillStyle = "#AB0520"; 
				if (canvasObj.bgImg.imgName.includes('FB')) {
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX + 94, canvasObj.bgImg.textY + 60);
				} else {
					ctx.fillText(canvasObj.textInput.text, canvasObj.bgImg.textX + 94, canvasObj.bgImg.textY + 460);
				}
			} else if (canvasObj.bgImg.imgName.includes('Main')) {
				if (canvasObj.bgImg.imgName.includes('FB')) {
					ctx.textAlign = 'center';
					ctx.fillText(canvasObj.textInput.text, 1200, canvasObj.bgImg.textY + 330);
				} else {
					ctx.fillText(canvasObj.textInput.text, 1600, canvasObj.bgImg.textY + 1000);
				}
			} else if (canvasObj.bgImg.imgName.includes('fire')) {
				console.log(canvasObj.bgImg.width);
				if (canvasObj.bgImg.imgName.includes('FB')) {
					ctx.fillText(canvasObj.textInput.text, 1200, canvasObj.bgImg.textY + 390);
				} else {
					ctx.fillText(canvasObj.textInput.text, 1600, canvasObj.bgImg.textY + 1200);
				}
			}

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			updateDownloadLink(canvas);
		};
	};


	const updateDownloadLink = (canvas) => {
		const link = linkRef.current;
		link.href = canvas.toDataURL('image/png');
		link.download = 'WelcomeToTheUA.png';
	};

	const handleBackgroundChange = (e) => {
		const selectedValue = e.target.value;
		setBgImg(selectedValue);

		const allRadioButtons = document.querySelectorAll('.group .imgs div');
		allRadioButtons.forEach((div) => {
			const radio = div.querySelector('input[type="radio"]');
			if (radio.value === selectedValue) {
				div.classList.add('active');
			} else {
				div.classList.remove('active');
			}
		});
	};

	class CanvasInstanceObj {
		constructor(inText, bgImg) {
			this.textInput = {
				text: inText,
				length: inText.length,
				fontSize: this.setFontSize(inText, bgImg),
			};
			this.bgImg = {
				imgName: bgImg,
				imgFile: `${bgImg}`,
				width: this.setBgWidth(bgImg),
				height: this.setBgHeight(bgImg),
				textX: this.setTextXCoord(bgImg),
				textY: this.setTextYCoord(bgImg),
				textAreaWidth: this.setTextAreaWidth(bgImg),
				textAreaHeight: this.setTextAreaHeight(bgImg),
			};
		}

		setFontSize(text, bgImg) {
			let baseFontSize = 360;

			if (bgImg.includes('wil')) {
				baseFontSize = 500;
			}
			if (bgImg.includes('tick')) {
				baseFontSize = 420;
			}
			if (bgImg.includes('Main')) {
				baseFontSize = 600;
			}
			if (bgImg.includes('fire')) {
				baseFontSize = 600;
			}
			if (bgImg.includes('Main') && bgImg.includes('FB')) {
				baseFontSize = 420;
			}
			if (bgImg.includes('scor') && bgImg.includes('FB')) {
				baseFontSize = 270;
			}

			// Adjust the font size based on the length of the text
			let adjustedFontSize = baseFontSize - text.length * 5;
			if (adjustedFontSize < 50) {
				adjustedFontSize = 50; // Minimum font size
			}

			return adjustedFontSize;
		}

		setBgWidth(bgImg) {
			return bgImg.includes('FB') ? 1200 : 1600;
		}

		setBgHeight(bgImg) {
			return bgImg.includes('FB') ? 628 : 1600;
		}

		setTextXCoord(bgImg) {
			if (bgImg.includes('scor')) {
				return bgImg.includes('FB') ? 840 : 1150;
			}
			return bgImg.includes('FB') ? 46 : 60;
		}

		setTextYCoord(bgImg) {
			if (bgImg.includes('scor')) {
				return bgImg.includes('FB') ? -40 : 160;
			}
			return bgImg.includes('FB') ? 139 : 330;
		}

		setTextAreaWidth(bgImg) {
			if (bgImg.includes('scor')) {
				return bgImg.includes('FB') ? 410 : 700;
			}
			return bgImg.includes('FB') ? 734 : 1480;
		}

		setTextAreaHeight(bgImg) {
			if (bgImg.includes('scor')) {
				return bgImg.includes('FB') ? 225 : 390;
			}
			return bgImg.includes('FB') ? 141 : 345;
		}
	}


	return (
		<div className='meme-container'>
			<div className="container">
				<div className="container hero text-center">
					<h2 className="text-uppercase sans">
						Life's Better In Red and Blue
					</h2>
					<p>
						Ready to shout it from the rooftops? You’ve come to the right place. Select an image, enter your name, and share your Wildcat pride with the world!
					</p>
				</div>
			</div>

			<div className="container intro text-center">
				<h3 className="text-uppercase text-blue">Explore &amp; Download</h3>
			</div>

			<div className="container">
				<form name="socialGenForm" onSubmit={(e) => e.preventDefault()}>
					<p className="backgroundSelect">Select a background!</p>
					<div className="checkBox">
						<div className="group">
							<strong>SCOREBOARD</strong>
							<div className="imgs">
								<div>
									<input type="radio" className="backgroundSelect" id="scoreBoardSquare" name="bgimg" value={socialSqBlank.src} checked={bgImg === 'scoreBoardSquare'} onChange={handleBackgroundChange} />
									<label htmlFor="scoreBoardSquare">
										<img src={socialSq.src} width="100px" alt="Scoreboard Square" />
									</label>
								</div>
								<div>
									<input type="radio" className="backgroundSelect" id="scoreBoardFB" name="bgimg" value={socialFbBlank.src} checked={bgImg === 'scoreboardFB'} onChange={handleBackgroundChange} />
									<label htmlFor="scoreBoardFB">
										<img src={socialFb.src} width="150px" alt="Scoreboard FB" />
									</label>
								</div>
							</div>
						</div>
						<div className="group">
							<strong>WILBUR</strong>
							<div className="imgs">
								<div>
									<input type="radio" className="backgroundSelect" id="wilburSquare" name="bgimg" value={wilburSqBlank.src} checked={bgImg === 'wilburSquare'} onChange={handleBackgroundChange} />
									<label htmlFor="wilburSquare">
										<img src={wilburSq.src} width="100px" alt="Wilbur Square" />
									</label>
								</div>
								<div>
									<input type="radio" className="backgroundSelect" id="wilburFB" name="bgimg" value={wilburFbBlank.src} checked={bgImg === 'wilburFB'} onChange={handleBackgroundChange} />
									<label htmlFor="wilburFB">
										<img src={wilburFb.src} width="150px" alt="Wilbur FB" />
									</label>
								</div>
							</div>
						</div>
						<div className="group">
							<strong>WILMA</strong>
							<div className="imgs">
								<div>
									<input type="radio" className="backgroundSelect" id="wilmaSquare" name="bgimg" value={wilmaSqBlank.src} checked={bgImg === 'wilmaSquare'} onChange={handleBackgroundChange} />
									<label htmlFor="wilmaSquare">
										<img src={wilmaSq.src} width="100px" alt="Wilma Square" />
									</label>
								</div>
								<div>
									<input type="radio" className="backgroundSelect" id="wilmaFB" name="bgimg" value={wilmaFbBlank.src} checked={bgImg === 'wilmaFB'} onChange={handleBackgroundChange} />
									<label htmlFor="wilmaFB">
										<img src={wilmaFb.src} width="150px" alt="Wilma FB" />
									</label>
								</div>
							</div>
						</div>
						<div className="group">
							<strong>Ticket</strong>
							<div className="imgs">
								<div>
									<input type="radio" className="backgroundSelect" id="ticketSquare" name="bgimg" value={ticketSqBlank.src} checked={bgImg === 'ticketSquare'} onChange={handleBackgroundChange} />
									<label htmlFor="ticketSquare">
										<img src={ticketSq.src} width="100px" alt="ticket Square" />
									</label>
								</div>
								<div>
									<input type="radio" className="backgroundSelect" id="ticketFB" name="bgimg" value={ticketFbBlank.src} checked={bgImg === 'ticketFB'} onChange={handleBackgroundChange} />
									<label htmlFor="ticketFB">
										<img src={ticketFb.src} width="150px" alt="Wilma FB" />
									</label>
								</div>
							</div>
						</div>
						<div className="group">
							<strong>Old Main</strong>
							<div className="imgs">
								<div>
									<input type="radio" className="backgroundSelect" id="oldMainSquare" name="bgimg" value={oldMainSqBlank.src} checked={bgImg === 'oldMainSquare'} onChange={handleBackgroundChange} />
									<label htmlFor="oldMainSquare">
										<img src={oldMainSq.src} width="100px" alt="old Main Square" />
									</label>
								</div>
								<div>
									<input type="radio" className="backgroundSelect" id="oldMainFB" name="bgimg" value={oldMainFbBlank.src} checked={bgImg === 'oldMainFB'} onChange={handleBackgroundChange} />
									<label htmlFor="oldMainFB">
										<img src={oldMainFb.src} width="150px" alt="old Main FB" />
									</label>
								</div>
							</div>
						</div>
						<div className="group">
							<strong>Fireworks</strong>
							<div className="imgs">
								<div>
									<input type="radio" className="backgroundSelect" id="fireworksSquare" name="bgimg" value={fireworksSqBlank.src} checked={bgImg === 'fireworksSquare'} onChange={handleBackgroundChange} />
									<label htmlFor="fireworksSquare">
										<img src={fireworksSq.src} width="100px" alt="fireworks Square" />
									</label>
								</div>
								<div>
									<input type="radio" className="backgroundSelect" id="fireworksFB" name="bgimg" value={fireworksFbBlank.src} checked={bgImg === 'fireworksFB'} onChange={handleBackgroundChange} />
									<label htmlFor="fireworksFB">
										<img src={fireworksFb.src} width="150px" alt="fireworks FB" />
									</label>
								</div>
							</div>
						</div>
					</div>
					<p className="backgroundSelect">
						To Generate an Image <br /> Enter your name and click <strong>GO</strong>
					</p>
					<div className="inputSection">
						<input type="text" name="name" id="stuName" maxLength="18" value={name} onChange={(e) => setName(e.target.value)} onKeyPress={handleKeyPress} />
						<br />
						<br />
						<input type="button" name="submit" id="bttn" value="GO" onClick={generateImage} />
					</div>
					<span id="error">{errorText}</span>
				</form>

				<div id="canvasCont" className="canvasContainer hide">
					<canvas id="canvas" ref={canvasRef} width="300" height="100"></canvas>
					<div id="linkPlacementID">
						<a id="downloadLink" ref={linkRef}>Download</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Meme;

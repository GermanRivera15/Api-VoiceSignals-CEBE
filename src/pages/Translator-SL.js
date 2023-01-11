//? HOLISTIC - MEDIAPIPE - 29-08-22

import { Holistic } from "@mediapipe/holistic";
import React, { useRef, useState } from "react";
import * as holistic from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

import Button from 'react-bootstrap/Button';

import { detectNumber /*, mostrar*/ } from "./Translator-SLP/Utilities-Number"

import '../Styles/Translator-sl.css'

// import Modal from 'react-bootstrap/Modal';


export default function LearnLSP() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const drawConnectors = window.drawConnectors;
  const drawLandmarks = window.drawLandmarks;
  var camera = null;

  const [isShowVideo, setIsShowVideo] = useState(false);
  // const [stateButtonStar, setstateButtonStar] = useState(false);
  // const [stateButtonStar2, setstateButtonStar2] = useState(false);
  // const [stateButtonClose, setstateButtonClose] = useState(true);

  const [dataResult,setDataResult] = useState('')

  //Modal
  // const [showTranslator, setShowTranslator] = useState(false);
  // const handleCloseTranslator = () => setShowTranslator(false);
  // const handleShowTranslator = () => setShowTranslator(true);



  function onResults(results) {
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set canvas width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.fillStyle = 'transparent';
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.globalCompositeOperation = 'source-over';

    /*
    drawConnectors(canvasCtx, results.poseLandmarks, holistic.POSE_CONNECTIONS,
      { color: '#00cff7', lineWidth: 4 });
    drawLandmarks(canvasCtx, results.poseLandmarks,
      { color: '#ff0364', lineWidth: 2 });
  
    drawConnectors(canvasCtx, results.faceLandmarks, holistic.FACEMESH_TESSELATION,
      { color: '#C0C0C070', lineWidth: 1 });
  */
    drawConnectors(canvasCtx, results.leftHandLandmarks, holistic.HAND_CONNECTIONS,
      { color: '#CC0000', lineWidth: 2 });
    drawLandmarks(canvasCtx, results.leftHandLandmarks,
      { color: '#00FF00', lineWidth: 0.5 });
    drawConnectors(canvasCtx, results.rightHandLandmarks, holistic.HAND_CONNECTIONS,
      { color: '#00CC00', lineWidth: 2 });
    // drawLandmarks(canvasCtx, results.rightHandLandmarks,
    //   { color: '#FF0000', lineWidth: 0.5 });

    canvasCtx.lineWidth = 5;
    if (results.poseLandmarks) {
      if (results.rightHandLandmarks) {
        canvasCtx.strokeStyle = "white";
      }
      if (results.leftHandLandmarks) {
        canvasCtx.strokeStyle = "white";
      }
    }
    canvasCtx.restore();

    //! rightHandLandmarks
    if (results.rightHandLandmarks !== undefined) {
      //Se procesa las coordenadas X,Y,Z del rightHandLandmarks
      var rightHandX = [];
      var rightHandY = [];
      var rightHandZ = [];

      results.rightHandLandmarks.map(variable => {
        canvasCtx.beginPath();
        canvasCtx.arc(variable.x  * canvasElement.width, variable.y * canvasElement.height, 2, 0, Math.PI * 2, true);
        canvasCtx.fill();
        rightHandX.push(parseInt(variable.x * canvasElement.width));
        rightHandY.push(parseInt(variable.y * canvasElement.height));
        rightHandZ.push(variable.z);
        return 0;
      });

      // detectNumber(rightHandX, rightHandY,rightHandZ)
      setDataResult(detectNumber(rightHandX, rightHandY,rightHandZ))
      // console.log(mostrar(rightHandX, rightHandY, rightHandZ))

    }
  }

  const startCam = () => {
    // setstateButtonStar(true)  //Disabled Button
    // setstateButtonClose(false)
    // if(!stateButtonStar2){
    //   handleShowTranslator()
    // }
    
    setIsShowVideo(true);
    
    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null && canvasRef.current != null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await holistic.send({ image: webcamRef.current.video });
        },
        width: canvasRef.width,
        height: canvasRef.height,
      });
      camera.start();
    }else{
      console.log('Ups') 
    }
  }

  const stopCam = () => {
    let stream = webcamRef.current.stream;  //WebCam
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    camera.stop();  //Canvas
    setIsShowVideo(false);

    // setstateButtonStar(false);
  }

  return (
    <div className={!isShowVideo ? "NoShowVideo" : "container-major-traslator"}>
      {isShowVideo &&
        <div className={"container-traslator"}>
          <div className="camView">
          <Webcam
            audio={false}
            ref={webcamRef}
            className='web-cam'
          />

          <canvas
            ref={canvasRef}
            id='output_canva'
            className="output_canvas"
          ></canvas>
        </div>

        <div className="result-data">
        {dataResult!==undefined ?
          dataResult :
          'Seña no reconocida'
        }
        </div>
        </div>

        
      }

      <div className="buttons-options">
      <Button variant="primary" /*disabled={stateButtonStar}*/ onClick={startCam}>Start Video</Button>
      <Button variant="danger" /*disabled={stateButtonClose}*/ onClick={stopCam}>Stop Video</Button>
      </div>

{/* 
      <Modal
        show={showTranslator}
        onHide={handleCloseTranslator}
        backdrop="static"
        centered
        keyboard={false}
        className='container-modal-favorite'
      >
        <Modal.Header>
          <Modal.Title className='title-modal-favorite'>Empezar el Traductor</Modal.Title>
        </Modal.Header>
        <Modal.Body className='body-modal-favorite'>
        Clic en Empezar para iniciar el Reconocimiento
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              startCam()
              handleCloseTranslator()
            }
            }
          >
            Empezar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleCloseTranslator();
              setstateButtonStar(false);
              setstateButtonStar2(true);
              setstateButtonClose(false);
            }
            }
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal> */}

    </div>
  );
};

// import ContainerModel from "../components/model"
import React  from "react";
import '../Styles/Model.css'
export default function Models() {
  let arreglo = [
    { Code: 0, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 1, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 2, Name: "/models/model/hand.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 3, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 4, Name: "/models/model/Hand-model2.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 5, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 6, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 7, Name: "/models/model/hand.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 8, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 9, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 10, Name: "/models/model/hand.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 11, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 12, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 13, Name: "/models/model/hand.glb", Poster:'/models/poster/avatarTest.JPG'},
    { Code: 14, Name: "/models/model/bmw.glb", Poster:'/models/poster/avatarTest.JPG'},
  ]

  const modelRef = React.useRef();
  
  return (
    <div className="container-model">
      {
        arreglo.map(
          arregloMap =>
            <li key= {arregloMap.Code}>
              <model-viewer
                class='model'
                src={arregloMap.Name}
                poster={arregloMap.Poster}
                auto-rotate
                shadow-intensity="1"
                camera-controls
                touch-action="pan-y"
                disable-zoom

                ref={(ref) => {
                  modelRef.current = ref;
                }}

              >
              </model-viewer>

            </li>
        )
      }

    </div>
  )
}

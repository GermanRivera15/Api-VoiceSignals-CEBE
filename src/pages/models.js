// import ContainerModel from "../components/model"
import React  from "react";

export default function Models() {
  let arreglo = [
    { Code: 0, Name: "https://drive.google.com/file/d/1KMU7eGxkVMbGqCiCJ5zdTDQ8_ZPZtotL/view?usp=share_link" },
    // { Code: 1, Name: "/models/boom_2.glb" },
    // { Code: 2, Name: "/models/Canoe.glb" },
    // { Code: 3, Name: "/models/Canoe.glb" },
    // { Code: 4, Name: "/models/Canoe.glb" },
    // { Code: 5, Name: "/models/Canoe.glb" },
    // { Code: 6, Name: "/models/Canoe.glb" },
    // { Code: 7, Name: "/models/Canoe.glb" },
    // { Code: 8, Name: "/models/Canoe.glb" },
    // { Code: 9, Name: "/models/Canoe.glb" },
    // { Code: 10, Name: "/models/Canoe.glb" },
    // { Code: 11, Name: "/models/Canoe.glb" },
    // { Code: 12, Name: "/models/Canoe.glb" },
    // { Code: 13, Name: "/models/Canoe.glb" },
    // { Code: 14, Name: "/models/Canoe.glb" }
  ]

  const modelRef = React.useRef();
  
  return (
    <div className="container-model">
      {
        arreglo.map(
          arregloMap =>
            <li key= {arregloMap.Code}>
              <model-viewer
                src={arregloMap.Name}
                alt="A rock"
                camera-controls
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

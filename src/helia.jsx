import { dagJson } from "@helia/dag-json";
import { json } from "@helia/json";
import { CID } from "multiformats/cid";

import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";

import { useEffect } from "react";
import { useState } from "react";

function HeliaPrueba() {
  const [helia, setHelia] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [byteArray, setByteArray] = useState(null);

  const cargaHelia = async () => {
    if (helia === null) {
      console.log("CARGANDO");
      const h = await createHelia({});
      setHelia(h);
      console.log("Cargado");
    }
  };

  useEffect(() => {
    cargaHelia();
  }, [imageUpload]);

  const getBytes = async (event) => {
    debugger;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      let byte = new Uint8Array(event.target.result);
      setByteArray(byte);
      // Aquí puedes utilizar el array de bytes como desees
      console.log(byteArray);
    };

    reader.readAsArrayBuffer(file);
    try {
      if (helia !== null && byteArray !== null) {
        const fs = unixfs(helia);

        // const bytes = new TextEncoder().encode(currentFile);
        const cid = await fs.addFile({
          path: "algo.jpg",
          content: byteArray,
        });
        console.log("Image added to IPFS with CID:", cid.toString());

        const j = dagJson(helia);

        const electoralData = {
          image: cid,
          titulo: "Algo",
          code: "2",
        };
        const newCID = await j.add(electoralData);
        console.log("DATAS added to IPFS with CID:", newCID.toString());

        const algo = await j.get(newCID);
        console.log("algo", algo);

        let fileContents = [];
        for await (const chunk of fs.cat(algo.image)) {
          fileContents.push(chunk);
        }
        console.log("fileContents.length", fileContents[0].length);
        console.log("fuente", byteArray.toString().slice(0, 50));
        console.log("lo que llega", fileContents[0].toString().slice(0, 50));

        const blob = new Blob(fileContents, {
          type: "image/jpg",
        });
        const imageUrl = URL.createObjectURL(blob);

        // arrayData.forEach((value) => {
        //   if (byteArray.includes(value)) {
        //     console.error("NOOO", value);
        //   }
        // });
        // create an image element and set its source to the object URL
        const img = document.createElement("img");
        img.src = imageUrl;

        document.body.appendChild(img);
        debugger;
        setImageUpload(blob);
      }
    } catch (error) {
      console.log("ipfs image uploadToIpfs error: ", error);
    }
  };

  // upload the image to
  const uploadToIpfs = async (file) => {
    debugger;
    if (typeof currentFile !== "undefined") {
    }
  };

  return (
    <div>
      <h1>PRUEBAS</h1>
      {/* <button onClick={exampleHelia} style={{ width: "200px" }}>
        DALE
      </button> */}
      <form>
        <input accept="image/*" name="file" type="file" onChange={getBytes} />
      </form>
      <img src={imageUpload} alt="{imageUpload.name}" />
    </div>
  );
}

export default HeliaPrueba;


import { create } from "ipfs-http-client";

const clientIpfs = create({
    host: "url.a.tu.nodo",
    protocol: "https",
});
function IPFSPrueba() {
    const uploadImageToIpfs = async (event) => {
        event.preventDefault();
        const currentFile = event.target.files[0];
        if (typeof currentFile !== "undefined") {
            try {
                debugger
                const cid = await clientIpfs.add(currentFile);
                console.log(cid);
            } catch (error) {
                console.log("ipfs image uploadToIpfs error: ", error);
            }
        }
    };



    return (
        <div>
            <h1>PRUEBAS</h1>
            <form>
                <input accept="image/*" name="file" type="file" onChange={uploadImageToIpfs} />
            </form>
            {/* <img src={imageUpload} alt="{imageUpload.name}" /> */}
        </div>
    );
}

export default IPFSPrueba;

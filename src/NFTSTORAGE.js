
import { NFTStorage } from 'nft.storage'
const client = new NFTStorage({ token: 'TOKEEEEEEN' })

function UploadNFTStorage() {

    async function main(event) {

        const metadata = await client.store({
            name: event.target.files[0].name,
            description: event.target.files[0].name,
            image: event.target.files[0]
        });
        console.log(metadata)
        debugger;
        console.log(metadata.url)
    }
    return (
        <div>
            <h1>PRUEBAS</h1>
            <form>
                <input accept="image/*" name="file" type="file" onChange={main} />
            </form>
        </div>
    );
}

export default UploadNFTStorage;

import UrlParser from "../../routes/url-parser";

const Detail = {
    async render() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        return `
            <div>
                <h1>Detail ${url.id}</h1>
            </div>
        `;
    },

    async afterRender() {

    }
}

export default Detail;
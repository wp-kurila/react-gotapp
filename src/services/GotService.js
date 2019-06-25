export default class GotService {
    constructor() {
        this._apiBase = "https://anapioficeandfire.com/api";
    }

    async getResource(url) {
        const res = await fetch (`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=60&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);     
        return this._transformCharacter(character);
    }

    async getAllHouses() {
        const res = await this.getResource(`/houses/`);        
        return res.map(this._transformHouses);
    }

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouses(house);
    }

    async getAllBooks() {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }

    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return "Данных нет"
        }
    }

    extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture),
            id: this.extractId(char)          
        }
    }

    _transformHouses = (house) => {
        return {
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }

    _transformBook(book) {
        return {
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }
}

export default class ModesService {
  constructor(path) {
    this.path = path;
  }

  async getModes() {
    const responce = await fetch(this.path);
    const result = await responce.json();

    return result;
  }

  async getCurrentMode() {
    const responce = await fetch(`${this.path}/current`);
    const result = await responce.json();

    return result;
  }

  async updateMode(mode) {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: mode }),
    };

    console.log(options);

    const responce = await fetch(this.path, options);
    const result = await responce.json();

    return result;
  }
}

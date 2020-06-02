export default class LightersService {
  constructor(path) {
    this.path = path;
  }

  async getLighters() {
    const responce = await fetch(this.path);
    const result = await responce.json();

    return result;
  }

  async getLighterById(id) {
    const responce = await fetch(`${this.path}/${id}`);
    const result = await responce.json();

    return result;
  }

  async udpateLighterStatusById(id, status) {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    };

    const responce = await fetch(`${this.path}/${id}/status`, options);

    if (!responce.ok) {
      throw new Error(responce.statusText);
    }

    const result = await responce.json();

    return result;
  }

  async updateLighterById(id, body) {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const responce = await fetch(`${this.path}/${id}`, options);
    const result = await responce.json();

    return result;
  }
}

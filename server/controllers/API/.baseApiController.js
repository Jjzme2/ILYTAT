class ApiController {
  constructor(service, model) {
    this.service = service;
    this.model = model;
  }

  getEmpty() {
    return this.service.getEmpty();
  }

  async getAll() {
    const list = await this.service.list();
    const items = list.map((item) => this.service.createItem(item));

    return items;
  }

  getOne(id) {
    const item = this.service.getOne(id);
    return this.service.createItem(item);
  }

  getActive() {
    const list = this.service.getActive(true);
    const items = list.map((item) => this.service.createItem(item));

    return items;
  }

  getInactive() {
    const list = this.service.getActive(false);
    const items = list.map((item) => this.service.createItem(item));

    return items;
  }
}

module.exports = ApiController;

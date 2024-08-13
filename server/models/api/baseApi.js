class BaseAPi {
	constructor(id, name, created_on, updated_on) {
		this.id = id;
		this.name = name;
		this.created_on = created_on;
		this.updated_on = updated_on;
	}
}

module.exports = BaseAPi;

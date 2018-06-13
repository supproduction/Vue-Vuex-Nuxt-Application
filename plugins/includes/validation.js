import Vue from 'vue';

class Errors {
  constructor() {
    this.errors = {};
  };

  has(field) {
    return this.errors.hasOwnProperty(field);
  }

  record(name, fields) {
    Vue.set(this.errors[name] = fields);
  }

  validEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  get(fields) {
    if (this.errors[fields]) {
      return this.errors[fields][0]
    }
  }

  any() {
    return Object.keys(this.errors).length > 0;
  }

  clear(field) {
    delete this.errors[field];
  }

  fullClear() {
    this.errors = {};
  }
}

class Form {
constructor(data) {
  this.originalData = data;

  for (let field in data) {
    this[field] = data[field]
  }
  this.errors = new Errors();
}

record() {
  this.errors.fullClear();
  for(let key in this) {
    if(key !== 'errors') {
      if (this[key][1] === '') {
        this.errors.record(key, this[key]);
      } else if (key === 'email' && !this.errors.validEmail(this[key][1])) {
        //// Email validation
        // this[key][0] = "Valid email required.";
        this.errors.record(key, this[key]);
      }
    }
  }
}

reset() {
  for (let field in this.originalData) {
    this[field] = '';
  }
}
}

export { Errors, Form };

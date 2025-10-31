
class CertificateStoreOptions {

    constructor({
        machine = null,
        pkcs12 = null,
        password = null,
        thumbprint = null,
        keyName = null,
        certFile = null
    } = {}) {
        this.args = [];
        // Initialize private properties
        this._machine = machine;
        this._pkcs12 = pkcs12;
        this._password = password;
        this._thumbprint = thumbprint;
        this._keyName = keyName;
        this._certFile = certFile;

        // Flag constants
        this.CertStoreOptions = {
            machine: "--machine",
            pkcs12: "--pkcs12",
            password: "--password",
            thumbprint: "--thumbprint",
            keyName: "--key-name",
            certFile: "--cert-file"
        }
        // Array with values
        this.entries = {
            machine: this._machine,
            pkcs12: this._pkcs12,
            password: this._password,
            thumbprint: this._thumbprint,
            keyName: this._keyName,
            certFile: this._certFile
        };


        // Iterate over the entries and add to the args array if value is not null
        for (const [key, value] of Object.entries(this.entries)) {
            if (value !== null) {
                // Get the corresponding CLI flag using the key
                const cliFlag = this.CertStoreOptions[key];
                if (value) {
                    this.args.push(cliFlag);
                    this.args.push(value);
                }
            }
        }
    }

      // Getter and Setter for machine
      get machine() {
        return this._machine;
    }

    set machine(value) {
        this._machine = value;
    }

    // Getter and Setter for pkcs12
    get pkcs12() {
        return this._pkcs12;
    }

    set pkcs12(value) {
        this._pkcs12 = value;
    }

    // Getter and Setter for password
    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    // Getter and Setter for thumbprint
    get thumbprint() {
        return this._thumbprint;
    }

    set thumbprint(value) {
        this._thumbprint = value;
    }

    // Getter and Setter for keyName
    get keyName() {
        return this._keyName;
    }

    set keyName(value) {
        this._keyName = value;
    }

    // Getter and Setter for certFile
    get certFile() {
        return this._certFile;
    }

    set certFile(value) {
        this._certFile = value;
    }

    // Getter and Setter methods for machine
    getMachine() {
        return this._machine;
    }

    setMachine(value) {
        this._machine = value;
    }

    // Getter and Setter methods for pkcs12
    getPkcs12() {
        return this._pkcs12;
    }

    setPkcs12(value) {
        this._pkcs12 = value;
    }

    // Getter and Setter methods for password
    getPassword() {
        return this._password;
    }

    setPassword(value) {
        this._password = value;
    }

    // Getter and Setter methods for thumbprint
    getThumbprint() {
        return this._thumbprint;
    }

    setThumbprint(value) {
        this._thumbprint = value;
    }

    // Getter and Setter methods for keyName
    getKeyName() {
        return this._keyName;
    }

    setKeyName(value) {
        this._keyName = value;
    }

    // Getter and Setter methods for certFile
    getCertFile() {
        return this._certFile;
    }

    setCertFile(value) {
        this._certFile = value;
    }

    getCertStoreOptions() {
        return this.args;
    }
}

exports.CertificateStoreOptions = CertificateStoreOptions

    
  

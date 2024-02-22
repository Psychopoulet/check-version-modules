export default function checkNonNullPureObject (data: object | null): Promise<void> {

    if ("undefined" === typeof data) {

        return Promise.reject(new ReferenceError("Missing \"data\" parameter"));

    }
        else if ("object" !== typeof data) {

            return Promise.reject(new TypeError("\"data\" parameter is not an object"));

        }
        else if (null === data) {

            return Promise.reject(new TypeError("\"data\" parameter is null"));

        }
        else if (data instanceof Array) {

            return Promise.reject(new TypeError("\"data\" parameter is an Array and not a pure object"));

        }

    else {

        return Promise.resolve();

    }

}

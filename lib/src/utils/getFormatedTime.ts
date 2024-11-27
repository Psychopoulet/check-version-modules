// deps

    // locals
    import padleft from "./padleft";

// module

export default function getFormatedTime (): string {

    const date: Date = new Date();

    return padleft(date.getHours()) + ":"
            + padleft(date.getMinutes()) + ":"
            + padleft(date.getSeconds());

}

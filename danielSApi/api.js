const createLi = (api) => {
    const li = document.createElement('li');
    li.textContent = `${api}`;
    return li;
};

const appendToDOM = (a, b, c, d, e) => {
    const ul = document.querySelector('ul');
    ul.appendChild(createLi(a));
    ul.appendChild(createLi(b));
    ul.appendChild(createLi(c));
    ul.appendChild(createLi(d));
    ul.appendChild(createLi(e));
};

const api = () => {
    axios.get('https://api.github.com/users/danielspofford/events')
    .then(response => {
        const type = response.data;
        const mapType = type.map(t => {return t.type});
        format(mapType);
    })
    .catch(error => console.error(error));
}

const format = (mt) => {
    // get data that doesn't have a type count
    const others = mt.filter(m => m !== 'PullRequestEvent' && m !== 'PushEvent');

    // match data against known search params
    const data = mt.join(""),
    comparable = [ 'PullRequestEvent', 'ForkEvent', 'PushEvent', 'IssueCommentEvent'],
    regex = new RegExp(comparable.join("|"), "g"),
    matches = data.match(regex);

    // get match counts
    const foundCounter = {};
    matches.map(m => foundCounter[m] = foundCounter[m] + 1 || 1);

    // get all other counts
    const otherCounter = {};
    others.map(m => otherCounter[m] = otherCounter[m] + 1 || 1);

    // format data to be appended to DOM
    let pret = `Pull Request Event Total: ${foundCounter.PullRequestEvent * 5}`;
    let pet = `Push Event Total: ${foundCounter.PushEvent * 2}`;
    let fet = `Fork Event Total: 0`;
    let icet = `Issue Comment Event Total: 0`;
    let ao = `All Others Total: ${
        otherCounter.PullRequestReviewEvent + 
        otherCounter.DeleteEvent + 
        otherCounter.CreateEvent}`;

    appendToDOM(pret, pet, fet, icet, ao);
}

api();



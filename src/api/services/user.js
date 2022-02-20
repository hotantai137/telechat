
function callAPI() {
    fetch("http://localhost:3001/user")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}
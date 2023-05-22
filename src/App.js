import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CardList from "./Components/card-list/cardlist.component";
import SearchBox from "./Components/search-box/seacrhbox.componet";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }
  OnSearchChange = (e) => {
    const searchField = e.target.value.toLowerCase();
    console.log(searchField);

    this.setState(() => {
      return { searchField: searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { OnSearchChange } = this;
    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox
          className="monster-search-box"
          placeholder="search monsters"
          onChange={OnSearchChange}
        />
        <CardList monsters={filteredMonster} />
      </div>
    );
  }
}

export default App;

// randomizer = () => {
//     const card = this.state.cards[parseInt(Math.random() * this.state.cards.length)];
//     this.setState({ current: card });
//   };

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

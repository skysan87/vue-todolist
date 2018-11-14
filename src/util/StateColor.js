export default class StateColor {
  static getColor (state) {
    switch (state) {
      case 0:
        return 'badge-light circle-button-border'
      case 1:
        return 'badge-warning'
      case 2:
        return 'badge-success'
      default:
        return 'badge-info'
    }
  }
}

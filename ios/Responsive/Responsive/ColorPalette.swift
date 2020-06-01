import SwiftUI

struct ColorPalette {
    private init () {}

    static let glossyGrape = Color(hex: 0x9C89B8)
    static let kobi = Color(hex: 0xF0A6CA)
    static let pinkLavender = Color(hex: 0xEFC3E6)
    static let magnolia = Color(hex: 0xF0E6EF)
    static let lightPeriwinkle = Color(hex: 0xB8BEDD)
}

private extension Color {
    init(hex: Int) {
        let red = Double((hex & 0xFF0000) >> 16)/255
        let green = Double((hex & 0x00FF00) >> 8)/255
        let blue = Double(hex & 0x0000FF)/255
        self.init(red: red, green: green, blue: blue)
    }
}

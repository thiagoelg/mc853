import SwiftUI

struct FormButtonStyle: ButtonStyle {
    func makeBody(configuration: Self.Configuration) -> some View {
        return configuration.label
            .frame(height: 44)
            .padding([.leading, .trailing], 24)
            .background(
                RoundedRectangle(cornerRadius: 4)
                    .foregroundColor(ColorPalette.glossyGrape)
            )
            .foregroundColor(Color.white)
    }
}

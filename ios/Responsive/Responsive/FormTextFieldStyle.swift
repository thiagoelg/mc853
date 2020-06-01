import SwiftUI

struct FormTextFieldStyle: TextFieldStyle {
    func _body(configuration: TextField<Self._Label>) -> some View {
        configuration
            .frame(height: 44)
            .padding([.leading, .trailing], 8)
            .overlay(
                RoundedRectangle(cornerRadius: 4)
                    .stroke(ColorPalette.magnolia)
            )
    }
}

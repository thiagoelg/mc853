import SwiftUI
import ComposableArchitecture
import Foundation

struct SignUpView: View {
    let store: Store<AppState, AppAction>

    @State var name = ""
    @State var email = ""
    @State var password = ""

    var body: some View {
        WithViewStore(self.store) { viewStore in
            NavigationView {
                VStack(spacing: 24) {
                    TextField("Nome", text: self.$name)
                        .textContentType(.name)
                        .textFieldStyle(FormTextFieldStyle())

                    TextField("E-mail", text: self.$email)
                        .textContentType(.emailAddress)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                        .textFieldStyle(FormTextFieldStyle())

                    SecureField("Senha", text: self.$password)
                        .textContentType(.password)
                        .textFieldStyle(FormTextFieldStyle())

                    Spacer()
                        .frame(height: 0)

                    Button("Registrar-se") {
                        viewStore.send(.signUp(name: self.name, email: self.email, password: self.password))
                    }
                    .buttonStyle(FormButtonStyle())
                }
                .padding(16)
            }
        }
    }
}

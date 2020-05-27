import SwiftUI
import Foundation

struct SignUpView: View {
    @State var name = ""
    @State var email = ""
    @State var password = ""

    var body: some View {
        NavigationView {
            Form {
                Section {
                    TextField("Nome", text: $name)
                    TextField("E-mail", text: $email)
                    SecureField("Senha", text: $password)
                }

                Section {
                    Button("Registrar-se") {
                        let signUpRequestBody = [
                            "name": self.name,
                            "email": self.email,
                            "password": self.password
                        ]

                        let signUpRequestData = 

                        var signUpRequest = URLRequest(url: URL(string: "http://localhost:9000/users/register")!)

                        let dataTask = URLSession.shared.dataTask(with: <#T##URL#>, completionHandler: <#T##(Data?, URLResponse?, Error?) -> Void#>)
                    }
                }
            }
        }
    }
}

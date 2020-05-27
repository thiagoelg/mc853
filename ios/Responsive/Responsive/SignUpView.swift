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
                        .textContentType(.name)
                    TextField("E-mail", text: $email)
                        .textContentType(.emailAddress)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                    SecureField("Senha", text: $password)
                        .textContentType(.password)
                }

                Section {
                    Button("Registrar-se") {
                        let signUpRequestBody = [
                            "name": self.name,
                            "email": self.email,
                            "password": self.password
                        ]

                        var signUpRequest = URLRequest(url: URL(string: "http://localhost:9001/api/users/register")!)
                        signUpRequest.httpMethod = "POST"
                        signUpRequest.httpBody = try? JSONEncoder().encode(signUpRequestBody)
                        signUpRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                        signUpRequest.addValue("application/json", forHTTPHeaderField: "Accept")

                        let dataTask = URLSession.shared.dataTask(with: signUpRequest) { responseData, _, error in
                            guard let responseData = responseData else {
                                return
                            }

                            if let decodedResponseData = try? JSONDecoder().decode([String: String].self, from: responseData) {
                                print(decodedResponseData)
                            }
                        }

                        dataTask.resume()
                    }
                }
            }
        }
    }
}

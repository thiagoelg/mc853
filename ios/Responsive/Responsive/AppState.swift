import ComposableArchitecture
import Foundation

struct AppState: Equatable {
    var isSigningUp: Bool = false
    var signedInUser: [String: String] = [:]
    var didSignUpFail: Bool = false
}

enum AppAction: Equatable {
    case signUp(name: String, email: String, password: String)
    case signIn(Result<[String: String], APIError>)
}

struct AppEnvironment {
    let mainQueue: AnySchedulerOf<DispatchQueue>
    let signUp: (String, String, String) -> Effect<[String: String], APIError>
}

func AppStore() -> Store<AppState, AppAction> {
    return Store(
        initialState: AppState(),
        reducer: Reducer { state, action, environment in
            switch action {
            case let .signUp(name, email, password):
                state.isSigningUp = true

                return environment.signUp(name, email, password)
                    .receive(on: environment.mainQueue)
                    .catchToEffect()
                    .map(AppAction.signIn)

            case let .signIn(.success(user)):
                state.isSigningUp = false
                state.signedInUser = user
                state.didSignUpFail = false

                return Effect.fireAndForget {
                    print(user)
                }

            case let .signIn(.failure(.error(error))):
                state.didSignUpFail = true

                return Effect.fireAndForget {
                    print(error)
                }
            }
        },
        environment: AppEnvironment(
            mainQueue: DispatchQueue.main.eraseToAnyScheduler(),
            signUp: { name, email, password in
                let signUpRequestBody = [
                    "name": name,
                    "email": email,
                    "password": password
                ]

                var signUpRequest = URLRequest(url: URL(string: "http://localhost:9001/api/users/register")!)
                signUpRequest.httpMethod = "POST"
                signUpRequest.httpBody = try? JSONEncoder().encode(signUpRequestBody)
                signUpRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                signUpRequest.addValue("application/json", forHTTPHeaderField: "Accept")

                return URLSession.shared.dataTaskPublisher(for: signUpRequest)
                    .map { responseData, _ in responseData }
                    .decode(type: [String: String].self, decoder: JSONDecoder())
                    .mapError { error in APIError.error(error as NSError) }
                    .eraseToEffect()
            }
        )
    )
}

enum APIError: Error, Equatable {
    case error(NSError)
}

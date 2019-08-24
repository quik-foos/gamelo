
            <Input
            label="Email"
            placeholder="email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            label="Password"
            placeholder="password"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
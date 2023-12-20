package com.example.passwordlistactivity;

public class Password {
    private String name;
    private String password;

    public Password(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "Name: " + name + "\nPassword: " + password;
    }
}

package com.example.apicall;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.security.SecureRandom;

public class RNG extends AppCompatActivity {
    private EditText lengthPassword;
    private CheckBox includeSpecialChar;
    private CheckBox includeNumbers;
    private Button create;
    private Button copyButton;
    private TextView result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rng);

        lengthPassword = findViewById(R.id.editTextLength);
        includeSpecialChar = findViewById(R.id.checkBoxSpecialChars);
        includeNumbers = findViewById(R.id.checkBoxNumbers);
        create = findViewById(R.id.buttonGenerate);
        copyButton = findViewById(R.id.buttonCopy);
        result = findViewById(R.id.textViewResult);

        create.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                generatePassword();
            }
        });

        copyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                copyToClipboard();
                moveToTestActivity();
            }
        });
    }

    private void generatePassword() {
        int length = Integer.parseInt(lengthPassword.getText().toString());
        boolean includeSpecialChars = includeSpecialChar.isChecked();
        boolean include_num = includeNumbers.isChecked();

        String password = generatePassword(length, includeSpecialChars, include_num);
        result.setText(password);
    }

    private String generatePassword(int length, boolean includeSpecialChars, boolean includeNumbers) {
        String uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        String specialChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?";
        String numericChars = "0123456789";

        StringBuilder validChars = new StringBuilder(uppercaseChars + lowercaseChars);
        if (includeSpecialChars) {
            validChars.append(specialChars);
        }
        if (includeNumbers) {
            validChars.append(numericChars);
        }

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(validChars.length());
            char randomChar = validChars.charAt(randomIndex);
            password.append(randomChar);
        }

        return password.toString();
    }

    private void copyToClipboard() {
        String password = result.getText().toString();
        ClipboardManager clipboardManager = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        ClipData clipData = ClipData.newPlainText("Password", password);
        clipboardManager.setPrimaryClip(clipData);
        Toast.makeText(this, "Password copied to clipboard", Toast.LENGTH_SHORT).show();
    }

    private void moveToTestActivity() {
        Intent intent = new Intent(RNG.this, addpassword.class);
        startActivity(intent);
    }
}

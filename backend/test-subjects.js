async function test() {
    const loginRes = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: "ravi.sharma@sggs.edu.in", password: "Password@123", role: "HOD" })
    });
    const loginData = await loginRes.json();
    console.log("Login:", loginData.success ? "Success" : loginData);

    if (!loginData.success) return;

    const token = loginData.data.token;

    const deptsRes = await fetch("http://localhost:3000/api/departments", {
        headers: { Authorization: `Bearer ${token}` }
    });
    const deptsData = await deptsRes.json();
    console.log("Departments:", deptsData);
}

test();

#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;
const long long INF = 1e18;

/* -------------------- FAST I/O -------------------- */
#define fastio ios::sync_with_stdio(false); cin.tie(nullptr);

// Binary Exponentiation
long long power(long long base, long long exp) {
    long long res = 1;
    while (exp > 0) {
        if (exp & 1) res *= base;
        base *= base;
        exp >>= 1;
    }
    return res;
}

// Binary Exponentiation with Mod
long long modPow(long long base, long long exp, long long mod = MOD) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

// GCD & LCM
long long gcd(long long a, long long b) {
    return __gcd(a, b);
}

long long lcm(long long a, long long b) {
    return (a / gcd(a, b)) * b;
}

// Prime Check
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// Sieve of Eratosthenes
vector<int> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i)
                isPrime[j] = false;
        }
    }

    vector<int> primes;
    for (int i = 2; i <= n; i++)
        if (isPrime[i]) primes.push_back(i);

    return primes;
}

// Reverse String
string rev(string s) {
    reverse(s.begin(), s.end());
    return s;
}

// Palindrome Check
bool isPalindrome(string s) {
    string t = s;
    reverse(t.begin(), t.end());
    return s == t;
}

// To Lowercase
string toLower(string s) {
    for (char &c : s) c = tolower(c);
    return s;
}

// To Uppercase
string toUpper(string s) {
    for (char &c : s) c = toupper(c);
    return s;
}

// Prefix Sum
vector<long long> prefixSum(vector<int>& a) {
    int n = a.size();
    vector<long long> pref(n + 1, 0);
    for (int i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + a[i];
    }
    return pref;
}

// Min & Max
int getMin(vector<int>& a) {
    return *min_element(a.begin(), a.end());
}

int getMax(vector<int>& a) {
    return *max_element(a.begin(), a.end());
}

// Count Digits
int countDigits(long long n) {
    return to_string(n).size();
}

// Reverse Number
long long reverseNumber(long long n) {
    long long rev = 0;
    while (n > 0) {
        rev = rev * 10 + (n % 10);
        n /= 10;
    }
    return rev;
}

//mex 
int mex(vector<int>& a) {
    int n = a.size();
    vector<bool> present(n + 1, false);

    for (int x : a) {
        if (x >= 0 && x <= n)
            present[x] = true;
    }

    for (int i = 0; i <= n; i++) {
        if (!present[i])
            return i;
    }
    return n;
}

#define int long long

signed main() {
    fastio;

    int t;
    cin >> t;
    while(t--){
        int n;
        cin >> n;
        vector<int> a(n);
        for(int i=0; i<n; i++){
            cin >> a[i];
        }

        

        cout << "\n";
    }

    return 0;
}
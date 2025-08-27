import java.io.*;
import java.util.*;

public class Main {
    // Fenwick tree supporting point‐update max and prefix‐max query
    static class Fenwick {
        int n;
        int[] f;
        Fenwick(int n) {
            this.n = n;
            f = new int[n+1];
        }
        // set f[idx] = max(f[idx], val)
        void update(int idx, int val) {
            for (int i = idx+1; i <= n; i += i & -i)
                if (f[i] < val) f[i] = val;
        }
        // return max over [0..idx]
        int query(int idx) {
            int res = 0;
            for (int i = idx+1; i > 0; i -= i & -i)
                if (f[i] > res) res = f[i];
            return res;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(in.readLine().trim());
        int[] lend = new int[n], pay = new int[n];
        StringTokenizer st = new StringTokenizer(in.readLine());
        for (int i = 0; i < n; i++) lend[i] = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(in.readLine());
        for (int i = 0; i < n; i++) pay[i] = Integer.parseInt(st.nextToken());

        // 1) Compress payback values
        int[] vals = Arrays.copyOf(pay, n);
        Arrays.sort(vals);
        int m = 1;
        for (int i = 1; i < n; i++)
            if (vals[i] != vals[i-1])
                vals[m++] = vals[i];
        // now vals[0..m-1] are the unique sorted paybacks

        // 2) Make list of lenders and sort by lend ascending
        int[][] A = new int[n][2];
        for (int i = 0; i < n; i++) {
            A[i][0] = lend[i];
            A[i][1] = pay[i];
        }
        Arrays.sort(A, (a,b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

        // 3) Fenwick over compressed payback
        Fenwick fw = new Fenwick(m);
        int ans = 0;

        for (int[] L : A) {
            int Lend = L[0], Pb = L[1];
            // find j = max index such that vals[j] <= Lend
            int j = Arrays.binarySearch(vals, 0, m, Lend);
            if (j < 0) j = -j - 2;  // upper_bound - 1
            int bestPrev = j >= 0 ? fw.query(j) : 0;
            int dp = bestPrev + 1;
            // update ans
            if (dp > ans) ans = dp;
            // update Fenwick at index of this payback
            int idxPb = Arrays.binarySearch(vals, 0, m, Pb);
            // (payback must be in vals, so idxPb>=0)
            fw.update(idxPb, dp);
        }

        System.out.println(ans);
    }
}

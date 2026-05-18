import * as dotenv from 'dotenv';
import { NicorAPI, NicorUsageHistoryEntry, NicorDailyUsageEntry } from './nicor';

dotenv.config();

const pad = (label: string, value: string | number, width = 30) =>
	`  ${label.padEnd(width)}${value}`;

function hr(char = '─', len = 54) {
	return char.repeat(len);
}

async function main() {
	const username = process.env.username ?? process.env.USERNAME ?? '';
	const password = process.env.password ?? process.env.PASSWORD ?? '';

	if (!username || !password) {
		console.error('Missing credentials — set username and password in .env');
		process.exit(1);
	}

	const api = new NicorAPI({ username, password });

	process.stdout.write('Logging in… ');
	await api.login();
	console.log('done');

	process.stdout.write('Fetching usage data… ');
	const data = await api.getNicorUsageHistory();
	console.log('done\n');

	// ── Account ──────────────────────────────────────────────
	console.log(hr('═'));
	console.log('  NICOR GAS — ACCOUNT SUMMARY');
	console.log(hr('═'));
	console.log(pad('Account ID:', data.accountId));
	console.log(pad('Projected Bill:', `$${data.projectedBill.toFixed(2)}`));
	console.log();

	// ── Billing History (last 3) ──────────────────────────────
	console.log(hr());
	console.log('  BILLING HISTORY (last 3 periods)');
	console.log(hr());
	console.log(
		'  Date'.padEnd(14) +
		'Therms'.padStart(10) +
		'CCfs'.padStart(10) +
		'Days'.padStart(8)
	);
	console.log('  ' + hr('-', 52));

	const history: NicorUsageHistoryEntry[] = (data.usageHistory ?? []).slice(0, 3);
	for (const period of history) {
		const dateLabel = period.Date ?? '';
		console.log(
			`  ${dateLabel.padEnd(12)}` +
			`${String(period.Therms).padStart(10)}` +
			`${String(period.CCfs).padStart(10)}` +
			`${String(period.DaysUsed).padStart(8)}`
		);
	}
	console.log();

	// ── Daily Usage (last 7 days) ─────────────────────────────
	console.log(hr());
	console.log('  DAILY USAGE (last 7 days)');
	console.log(hr());
	console.log(
		'  Date'.padEnd(13) +
		'Day'.padEnd(12) +
		'Therms'.padStart(8) +
		'Cost'.padStart(8) +
		'Avg °F'.padStart(9)
	);
	console.log('  ' + hr('-', 52));

	const sorted: NicorDailyUsageEntry[] = [...(data.dailyUsage ?? [])]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 7);

	for (const day of sorted) {
		const d = new Date(day.date);
		const dateStr = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
		console.log(
			`  ${dateStr.padEnd(11)}` +
			`${day.dayOfWeek.padEnd(12)}` +
			`${day.therms.toFixed(2).padStart(8)}` +
			`$${day.cost.toFixed(2).padStart(7)}` +
			`${day.avgTemp.toFixed(0).padStart(9)}`
		);
	}

	console.log();
	console.log(hr('═'));
}

main().catch(err => {
	console.error('\nError:', err.message);
	process.exit(1);
});

import cryptoJs from 'crypto-js';
import IPLDLFCTx from 'ipld-lfc-tx';
const {SHA256} = cryptoJs
const _SHA256 = (object) => {
	return SHA256(JSON.stringify(object)).toString();
};

/**
 * Generate block hash
 *
 * @param {object} block {index, prevHash, time, transactions, nonce}
 */
export const calculateBlockHash = (block) => {
	const {index, prevHash, time, transactions, nonce} = block;
	return _SHA256({index, prevHash, time, transactions, nonce});
};

/**
 * Generate transaction hash
 *
 * @param {object} transaction {id, type, inputs, outputs}
 */
export const transactionHash = async transaction => {
	const tx = new IPLDLFCTx.LFCTx(transaction)
	const cid = await IPLDLFCTx.util.cid(tx.serialize())
	return cid.toBaseEncodedString()
};

/**
 * Generate transaction input hash
 *
 * @param {object} transactionInput {transaction, index, amount, address}
 */
export const transactionInputHash = (transactionInput) => {
	const {tx, index, amount, address} = transactionInput;
	return _SHA256({tx, index, amount, address});
};

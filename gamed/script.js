// ハイスコアの保存用
window.gameHighScores = [];

// モンスター画像データ（12体のモンスター）
const monsterImages = [
    // 1行目
    { url: "./images/monsters/アゴマン.png", name: "アゴマン" },
    { url: "./images/monsters/ほのおマン.png", name: "ほのおマン" },
    { url: "./images/monsters/いしだ.png", name: "いしだ" },
    { url: "./images/monsters/いのライオン.png", name: "いのライオン" },

    // 2行目
    { url: "./images/monsters/おおとかげ.png", name: "おおとかげ" },
    { url: "./images/monsters/おばけ.png", name: "おばけ" },
    { url: "./images/monsters/さんぱくがん.png", name: "さんぱくがん" },
    { url: "./images/monsters/つちのこ.png", name: "つちのこ" },
    
    // 3行目
    { url: "./images/monsters/たきびまん.png", name: "たきびまん" },
    { url: "./images/monsters/ひとつめマン.png", name: "ひとつめマン" },
    { url: "./images/monsters/モヒカン.png", name: "モヒカン" },
    { url: "./images/monsters/ドラゴン.png", name: "ドラゴン" },
];

// プレイヤー画像
const playerImages = [
    "/api/placeholder/60/60",
    "/api/placeholder/60/60",
    "/api/placeholder/60/60"
];

// キャラクタークラス
class Character {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.level = 1;
        
        // 名前に基づいて能力値を生成
        const nameSum = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        if (type === 'player') {
            // プレイヤーキャラクターの能力値
            this.maxHp = 30 + (nameSum % 20); // HP低め
            this.maxMp = 15 + (nameSum % 10);
            this.attack = 8 + (nameSum % 5);
            this.defense = 5 + (nameSum % 3);
            this.speed = 4 + (nameSum % 4);
            this.magic = 6 + (nameSum % 6);
        } else {
            // 敵キャラクターの能力値 - 強さを増加
            const level = this.level;
            const multiplier = 1 + (level * 0.2); // 倍率アップ
            
            this.maxHp = Math.floor((15 + (nameSum % 10)) * multiplier);
            this.maxMp = Math.floor((5 + (nameSum % 5)) * multiplier);
            this.attack = Math.floor((7 + (nameSum % 3)) * multiplier);
            this.defense = Math.floor((4 + (nameSum % 2)) * multiplier);
            this.speed = Math.floor((3 + (nameSum % 3)) * multiplier);
            this.magic = Math.floor((3 + (nameSum % 4)) * multiplier);
        }
        
        this.hp = this.maxHp;
        this.mp = this.maxMp;
        this.isAlive = true;
    }
    
    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - Math.floor(this.defense / 2));
        this.hp = Math.max(0, this.hp - actualDamage);
        
        if (this.hp <= 0) {
            this.isAlive = false;
        }
        
        return actualDamage;
    }
    
    heal(amount) {
        const healAmount = Math.min(amount, this.maxHp - this.hp);
        this.hp += healAmount;
        return healAmount;
    }
    
    useSkill(mpCost) {
        if (this.mp >= mpCost) {
            this.mp -= mpCost;
            return true;
        }
        return false;
    }
    
    castHeal(target) {
        // 回復魔法
        if (this.useSkill(3)) {
            const healPower = Math.floor(this.magic * (0.5 + Math.random() * 0.5));
            return target.heal(healPower);
        }
        return 0;
    }
    
    castFireball(target) {
        // 攻撃魔法
        if (this.useSkill(5)) {
            const damageMultiplier = 1.0 + Math.random() * 0.5;
            const baseDamage = Math.floor(this.magic * damageMultiplier);
            return target.takeDamage(baseDamage);
        }
        return 0;
    }
}

// 敵クラス
class Enemy extends Character {
    constructor(name, level, imageData) {
        super(name, 'enemy');
        this.level = level || 1;
        this.expReward = Math.floor(10 * this.level * (0.8 + Math.random() * 0.4));
        this.goldReward = Math.floor(5 * this.level * (0.8 + Math.random() * 0.4));
        
        // モンスター画像の設定
        if (imageData) {
            this.sprite = imageData.url;
            this.name = imageData.name;
        } else {
            // ランダムにモンスター画像を選択
            const randomMonster = monsterImages[Math.floor(Math.random() * monsterImages.length)];
            this.sprite = randomMonster.url;
            this.name = randomMonster.name;
        }
    }
}

// モンスターの種類（レベルごとの配列）
const enemyTypes = [
    [0, 2, 8], // レベル1（ワンアイ、アクア、サイクロプス）
    [1, 6, 9], // レベル2（フレイム、ビースト、ヘルファイア）
    [3, 5, 10], // レベル3（ゴーレム、ゴースト、ファイアウィング）
    [4, 7, 11]  // レベル4（ドラゴン、デーモン、サンドワーム）
];

// アイテムの種類
const itemTypes = [
    { name: '回復薬', type: 'heal', power: 30 },
    { name: '上級回復薬', type: 'heal', power: 60 },
    { name: 'マジックポーション', type: 'mp', power: 20 },
    { name: '上級マジックポーション', type: 'mp', power: 40 },
    { name: '力の種', type: 'attack', power: 5 },
    { name: '守りの種', type: 'defense', power: 5 },
    { name: '素早さの種', type: 'speed', power: 3 },
    { name: '賢さの種', type: 'magic', power: 5 }
];

// ゲーム状態
const gameState = {
    players: [],
    enemy: null,
    battleCount: 0,
    maxBattles: 5, // 5バトルで終了
    expScore: 0,
    goldScore: 0,
    itemCount: 0,
    items: [],
    totalScore: 0,
    isGameOver: false,
    messageQueue: [],
    messageProcessing: false
};

// ゲーム起動時に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // メッセージを追加
    addMessage('ゲームを開始する準備ができました。');
    
    // スタートボタンのイベントリスナー
    document.getElementById('start-game-btn').addEventListener('click', function() {
        console.log('Start button clicked');
        document.querySelector('.start-screen').style.display = 'none';
        initGame();
    });
    
    // リスタートボタンのイベントリスナー
    document.getElementById('restart-game-btn').addEventListener('click', function() {
        console.log('Restart button clicked');
        document.querySelector('.game-over-screen').style.display = 'none';
        resetGame();
    });
    
    // ハイスコアリストの更新
    updateHighScoresList();
});

// ランダムな名前を生成
function generateRandomName() {
    const prefixes = ['勇者', '戦士', '魔法使い', '僧侶', '盗賊', '狩人', '賢者', '竜騎士'];
    const suffixes = ['アルファ', 'ベータ', 'ガンマ', 'デルタ', 'イプシロン', 'ゼータ', 'イータ', 'シータ'];
    
    return prefixes[Math.floor(Math.random() * prefixes.length)] + 
           suffixes[Math.floor(Math.random() * suffixes.length)];
}

// ゲームの初期化
function initGame() {
    console.log('Initializing game...');
    
    try {
        // プレイヤーキャラクターの作成
        const input1 = document.getElementById('character1-name');
        const input2 = document.getElementById('character2-name');
        const input3 = document.getElementById('character3-name');
        
        gameState.players = [
            new Character(input1.value.trim() || generateRandomName(), 'player'),
            new Character(input2.value.trim() || generateRandomName(), 'player'),
            new Character(input3.value.trim() || generateRandomName(), 'player')
        ];
        
        console.log('Players created:', gameState.players);
        
        // 初期敵の生成
        spawnEnemy();
        
        // UI更新
        updatePlayerUI();
        updateEnemyUI();
        updateScoreUI();
        
        // メッセージ表示
        addMessage('バトル開始！');
        addMessage(`${gameState.enemy.name}が現れた！`);
        
        // ターン処理開始
        setTimeout(processTurn, 1000); // 処理間隔を短縮
    } catch(error) {
        console.error('Error in initGame:', error);
        addMessage(`初期化中にエラーが発生しました: ${error.message}`);
    }
}

// 敵の生成
function spawnEnemy() {
    // 難易度は進行に応じて上昇
    const difficulty = Math.min(enemyTypes.length - 1, Math.floor(gameState.battleCount / 2));
    
    // その難易度に対応するモンスターグループからランダム選択
    const monsterGroup = enemyTypes[difficulty];
    const monsterIndex = monsterGroup[Math.floor(Math.random() * monsterGroup.length)];
    const monsterData = monsterImages[monsterIndex];
    
    // 敵の生成
    gameState.enemy = new Enemy(
        monsterData.name, 
        difficulty + 1,
        monsterData
    );
    
    console.log('Enemy spawned:', gameState.enemy);
}

// ターン処理
function processTurn() {
    if (gameState.isGameOver) return;
    
    try {
        console.log('Processing turn...');
        
        // 全キャラクターのリスト（スピード順にソート）
        const allCharacters = [...gameState.players, gameState.enemy]
            .filter(char => char && char.isAlive)
            .sort((a, b) => b.speed - a.speed);
        
        // 各キャラクターのアクション処理
        for (const character of allCharacters) {
            if (!character || !character.isAlive) continue;
            
            if (character.type === 'player') {
                performPlayerAction(character);
            } else {
                performEnemyAction(character);
            }
            
            // 敵が倒された場合
            if (gameState.enemy && !gameState.enemy.isAlive) {
                handleEnemyDefeat();
                return;
            }
            
            // プレイヤー全滅の場合
            if (gameState.players.every(player => !player || !player.isAlive)) {
                handleGameOver();
                return;
            }
        }
        
        // ターン終了時の処理
        setTimeout(processTurn, 1000); // 処理間隔を短縮
    } catch(error) {
        console.error('Error in processTurn:', error);
        addMessage(`ターン処理中にエラーが発生しました: ${error.message}`);
    }
}

// プレイヤーのアクション
function performPlayerAction(player) {
    // 生存している敵がいない場合はスキップ
    if (!gameState.enemy || !gameState.enemy.isAlive) return;
    
    // AIによるスキル選択
    const aiDecision = Math.random();
    let actionResult = 0;
    let actionMessage = '';
    
    // 味方のHP確認、HPが低い味方がいれば回復優先
    const lowHpAlly = gameState.players.find(p => 
        p && p.isAlive && p.hp < p.maxHp * 0.5
    );
    
    // 味方の回復が必要かつMPが十分ならヒール
    if (lowHpAlly && player.mp >= 3 && aiDecision < 0.7) {
        actionResult = player.castHeal(lowHpAlly);
        actionMessage = `${player.name}は${lowHpAlly.name}を回復した！ ${actionResult}ポイント回復！`;
        showHealText(lowHpAlly, actionResult);
    } 
    // MPが十分ならファイアボール
    else if (player.mp >= 5 && aiDecision < 0.4) {
        actionResult = player.castFireball(gameState.enemy);
        actionMessage = `${player.name}はファイアボールを唱えた！ ${gameState.enemy.name}に${actionResult}のダメージ！`;
        showDamageText(gameState.enemy, actionResult);
    } 
    // 通常攻撃
    else {
        // Character.prototype.attackメソッドを使用
        const damageMultiplier = 0.8 + Math.random() * 0.4; // 0.8 ~ 1.2
        const baseDamage = Math.floor(player.attack * damageMultiplier);
        actionResult = gameState.enemy.takeDamage(baseDamage);
        
        actionMessage = `${player.name}の攻撃！ ${gameState.enemy.name}に${actionResult}のダメージ！`;
        showDamageText(gameState.enemy, actionResult);
    }
    
    addMessage(actionMessage);
    updateEnemyUI();
}

// 敵のアクション
function performEnemyAction(enemy) {
    // 生存しているプレイヤーがいない場合はスキップ
    const alivePlayers = gameState.players.filter(p => p && p.isAlive);
    if (alivePlayers.length === 0) return;
    
    // ランダムなターゲット選択
    const targetIndex = Math.floor(Math.random() * alivePlayers.length);
    const target = alivePlayers[targetIndex];
    
    // AIによるスキル選択
    const aiDecision = Math.random();
    let actionResult = 0;
    let actionMessage = '';
    
    // 敵のHPが低く、MPが十分ならセルフヒール
    if (enemy.hp < enemy.maxHp * 0.3 && enemy.mp >= 3 && aiDecision < 0.6) {
        actionResult = enemy.castHeal(enemy);
        actionMessage = `${enemy.name}は回復魔法を唱えた！ ${actionResult}ポイント回復！`;
        showHealText(enemy, actionResult);
    } 
    // MPが十分ならファイアボール
    else if (enemy.mp >= 5 && aiDecision < 0.3) {
        actionResult = enemy.castFireball(target);
        actionMessage = `${enemy.name}はファイアボールを唱えた！ ${target.name}に${actionResult}のダメージ！`;
        showDamageText(target, actionResult);
    } 
    // 通常攻撃
    else {
        // 直接ダメージ計算
        const damageMultiplier = 0.8 + Math.random() * 0.4; // 0.8 ~ 1.2
        const baseDamage = Math.floor(enemy.attack * damageMultiplier * 1.2); // 敵の攻撃力アップ
        actionResult = target.takeDamage(baseDamage);
        
        actionMessage = `${enemy.name}の攻撃！ ${target.name}に${actionResult}のダメージ！`;
        showDamageText(target, actionResult);
    }
    
    addMessage(actionMessage);
    updatePlayerUI();
}

// 敵を倒した時の処理
function handleEnemyDefeat() {
    const enemy = gameState.enemy;
    
    // 戦闘回数の更新
    gameState.battleCount++;
    
    // 報酬の獲得
    const expReward = enemy.expReward;
    const goldReward = enemy.goldReward;
    
    // スコアに加算
    gameState.expScore += expReward;
    gameState.goldScore += goldReward;
    
    // メッセージ表示
    addMessage(`${enemy.name}を倒した！`);
    addMessage(`${expReward}の経験値と${goldReward}ゴールドを獲得！`);
    
    // アイテムドロップ判定
    if (Math.random() < 0.4) { // ドロップ率アップ
        const randomItemIndex = Math.floor(Math.random() * itemTypes.length);
        const itemTemplate = itemTypes[randomItemIndex];
        const item = {
            name: itemTemplate.name,
            type: itemTemplate.type,
            power: itemTemplate.power
        };
        
        gameState.items.push(item);
        gameState.itemCount++;
        
        addMessage(`${item.name}を手に入れた！`);
        
        // アイテムの効果を適用
        applyItemEffect(item);
    }
    
    // 最大バトル数に達したかチェック
    if (gameState.battleCount >= gameState.maxBattles) {
        addMessage('すべての戦闘に勝利した！');
        setTimeout(() => {
            handleGameOver(true); // 勝利フラグをtrueで渡す
        }, 1500);
        return;
    }
    
    // 総スコアの更新
    updateTotalScore();
    
    // UIの更新
    updateScoreUI();
    updatePlayerUI();
    
    // 次の敵の生成
    setTimeout(() => {
        spawnEnemy();
        updateEnemyUI();
        addMessage(`${gameState.enemy.name}が現れた！`);
        
        // 次のターン開始
        setTimeout(processTurn, 1000);
    }, 1500);
}

// アイテムの効果を適用
function applyItemEffect(item) {
    // 消費アイテムは自動使用
    const alivePlayers = gameState.players.filter(p => p && p.isAlive);
    if (alivePlayers.length === 0) return;
    
    const targetIndex = Math.floor(Math.random() * alivePlayers.length);
    const target = alivePlayers[targetIndex];
    
    if (item.type === 'heal') {
        const healAmount = target.heal(item.power);
        addMessage(`${target.name}のHPが${healAmount}回復した！`);
        showHealText(target, healAmount);
    } else if (item.type === 'mp') {
        const mpAmount = Math.min(item.power, target.maxMp - target.mp);
        target.mp += mpAmount;
        addMessage(`${target.name}のMPが${mpAmount}回復した！`);
    } else if (item.type === 'attack') {
        target.attack += item.power;
        addMessage(`${target.name}の攻撃力が${item.power}上がった！`);
    } else if (item.type === 'defense') {
        target.defense += item.power;
        addMessage(`${target.name}の防御力が${item.power}上がった！`);
    } else if (item.type === 'speed') {
        target.speed += item.power;
        addMessage(`${target.name}の素早さが${item.power}上がった！`);
    } else if (item.type === 'magic') {
        target.magic += item.power;
        addMessage(`${target.name}の魔力が${item.power}上がった！`);
    }
}

// ゲームオーバー処理
function handleGameOver(isVictory) {
    gameState.isGameOver = true;
    
    if (isVictory) {
        addMessage('ゲームクリア！おめでとう！');
        gameState.totalScore = Math.floor(gameState.totalScore * 1.5); // ボーナススコア
    } else {
        addMessage('ゲームオーバー...');
    }
    
    // ハイスコア更新の確認と保存
    saveHighScore();
    
    // UIの更新
    updateGameOverUI();
    
    // ゲームオーバー画面の表示
    setTimeout(() => {
        document.querySelector('.game-over-screen').style.display = 'flex';
    }, 2000);
}

// 総スコアの計算
function updateTotalScore() {
    gameState.totalScore = gameState.expScore + (gameState.goldScore * 2) + (gameState.itemCount * 50);
}

// プレイヤーUIの更新
function updatePlayerUI() {
    // 既存のプレイヤー表示をクリア
    const playerContainer = document.querySelector('.player-container');
    playerContainer.innerHTML = '';
    
    // 各プレイヤーの表示を更新
    gameState.players.forEach((player, index) => {
        if (!player) return;
        
        const playerElement = document.createElement('div');
        playerElement.className = 'player-character';
        
        if (!player.isAlive) {
            playerElement.style.opacity = '0.5';
        }
        
        playerElement.innerHTML = `
            <img class="player-sprite" src="${playerImages[index]}" alt="${player.name}">
            <p class="player-name">${player.name}</p>
            <p class="player-hp">HP: ${player.hp}/${player.maxHp}</p>
            <p class="player-mp">MP: ${player.mp}/${player.maxMp}</p>
        `;
        
        playerContainer.appendChild(playerElement);
    });
}

// 敵UIの更新
function updateEnemyUI() {
    if (!gameState.enemy) return;
    
    const enemy = gameState.enemy;
    const enemyElement = document.querySelector('.enemy-container');
    
    if (!enemy.isAlive) {
        enemyElement.style.opacity = '0.5';
    } else {
        enemyElement.style.opacity = '1';
    }
    
    enemyElement.innerHTML = `
        <img class="enemy-sprite" src="${enemy.sprite}" alt="${enemy.name}">
        <div class="enemy-name">${enemy.name}</div>
        <div class="enemy-hp">HP: ${enemy.hp}/${enemy.maxHp}</div>
    `;
}

// スコアUIの更新
function updateScoreUI() {
    document.getElementById('battle-count').textContent = gameState.battleCount;
    document.getElementById('exp-score').textContent = gameState.expScore;
    document.getElementById('gold-score').textContent = gameState.goldScore;
    document.getElementById('item-count').textContent = gameState.itemCount;
    document.getElementById('total-score').textContent = gameState.totalScore;
}

// ゲームオーバーUIの更新
function updateGameOverUI() {
    document.getElementById('final-score').textContent = gameState.totalScore;
    
    // ハイスコアの表示
    const highScores = getHighScores();
    document.getElementById('best-score').textContent = highScores.length > 0 ? highScores[0].score : 0;
    
    // ハイスコアリストの更新
    updateHighScoresList();
}

// メッセージの追加
function addMessage(message) {
    gameState.messageQueue.push(message);
    processMessageQueue();
}

// メッセージキューの処理
function processMessageQueue() {
    if (gameState.messageProcessing || gameState.messageQueue.length === 0) return;
    
    gameState.messageProcessing = true;
    const message = gameState.messageQueue.shift();
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.querySelector('.message-content').appendChild(messageElement);
    document.querySelector('.message-content').scrollTop = document.querySelector('.message-content').scrollHeight;
    
    setTimeout(() => {
        gameState.messageProcessing = false;
        processMessageQueue();
    }, 800); // メッセージの表示間隔を短縮
}

// ダメージテキストの表示エフェクト
function showDamageText(target, amount) {
    try {
        let x, y;
        const battleArea = document.querySelector('.battle-area');
        
        if (target.type === 'enemy') {
            const enemyElement = document.querySelector('.enemy-container');
            const rect = enemyElement.getBoundingClientRect();
            const containerRect = battleArea.getBoundingClientRect();
            
            x = rect.left - containerRect.left + rect.width / 2;
            y = rect.top - containerRect.top + rect.height / 2;
        } else {
            // プレイヤーの場合
            const playerElements = document.querySelectorAll('.player-character');
            const playerIndex = gameState.players.findIndex(p => p && p.name === target.name);
            
            if (playerIndex >= 0 && playerIndex < playerElements.length) {
                const playerElement = playerElements[playerIndex];
                const rect = playerElement.getBoundingClientRect();
                const containerRect = battleArea.getBoundingClientRect();
                
                x = rect.left - containerRect.left + rect.width / 2;
                y = rect.top - containerRect.top + rect.height / 2;
            } else {
                // 位置が特定できない場合はデフォルト位置
                x = battleArea.clientWidth / 2;
                y = battleArea.clientHeight / 2;
            }
        }
        
        const damageText = document.createElement('div');
        damageText.className = 'damage-text';
        damageText.textContent = amount;
        damageText.style.left = `${x}px`;
        damageText.style.top = `${y}px`;
        
        document.querySelector('.effects').appendChild(damageText);
        
        // アニメーション終了後に要素を削除
        setTimeout(() => {
            if (damageText.parentNode) {
                damageText.parentNode.removeChild(damageText);
            }
        }, 1500);
    } catch (error) {
        console.error('Error showing damage text:', error);
    }
}

// 回復テキストの表示エフェクト
function showHealText(target, amount) {
    try {
        let x, y;
        const battleArea = document.querySelector('.battle-area');
        
        if (target.type === 'enemy') {
            const enemyElement = document.querySelector('.enemy-container');
            const rect = enemyElement.getBoundingClientRect();
            const containerRect = battleArea.getBoundingClientRect();
            
            x = rect.left - containerRect.left + rect.width / 2;
            y = rect.top - containerRect.top + rect.height / 2;
        } else {
            // プレイヤーの場合
            const playerElements = document.querySelectorAll('.player-character');
            const playerIndex = gameState.players.findIndex(p => p && p.name === target.name);
            
            if (playerIndex >= 0 && playerIndex < playerElements.length) {
                const playerElement = playerElements[playerIndex];
                const rect = playerElement.getBoundingClientRect();
                const containerRect = battleArea.getBoundingClientRect();
                
                x = rect.left - containerRect.left + rect.width / 2;
                y = rect.top - containerRect.top + rect.height / 2;
            } else {
                // 位置が特定できない場合はデフォルト位置
                x = battleArea.clientWidth / 2;
                y = battleArea.clientHeight / 2;
            }
        }
        
        const healText = document.createElement('div');
        healText.className = 'heal-text';
        healText.textContent = amount;
        healText.style.left = `${x}px`;
        healText.style.top = `${y}px`;
        
        document.querySelector('.effects').appendChild(healText);
        
        // アニメーション終了後に要素を削除
        setTimeout(() => {
            if (healText.parentNode) {
                healText.parentNode.removeChild(healText);
            }
        }, 1500);
    } catch (error) {
        console.error('Error showing heal text:', error);
    }
}

// ハイスコアの取得
function getHighScores() {
    return window.gameHighScores || [];
}

// ハイスコアの保存
function saveHighScore() {
    const highScores = getHighScores();
    
    // チーム名の作成
    const teamName = gameState.players
        .filter(p => p)
        .map(p => p.name)
        .join(', ');
    
    // 新しいスコアエントリの作成
    const newScore = {
        team: teamName,
        score: gameState.totalScore,
        date: new Date().toISOString().split('T')[0]
    };
    
    // スコアリストに追加してソート
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    
    // 上位10件だけ保存
    const topScores = highScores.slice(0, 10);
    
    // グローバル変数に保存
    window.gameHighScores = topScores;
    
    return topScores;
}

// ハイスコアリストの更新
function updateHighScoresList() {
    const highScores = getHighScores();
    const highScoresList = document.getElementById('high-scores-list');
    
    if (!highScoresList) return;
    
    // リストをクリア
    highScoresList.innerHTML = '';
    
    // 各スコアをリストに追加
    highScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'high-score-item';
        
        listItem.innerHTML = `
            <span class="high-score-rank">${index + 1}.</span>
            <span class="high-score-team">${score.team}</span>
            <span class="high-score-value">${score.score}</span>
        `;
        
        highScoresList.appendChild(listItem);
    });
    
    // スコアがない場合のメッセージ
    if (highScores.length === 0) {
        const noScoresItem = document.createElement('li');
        noScoresItem.className = 'high-score-item';
        noScoresItem.textContent = 'ハイスコアはまだありません。';
        highScoresList.appendChild(noScoresItem);
    }
}

// ゲームのリセット
function resetGame() {
    // ゲーム状態のリセット
    gameState.players = [];
    gameState.enemy = null;
    gameState.battleCount = 0;
    gameState.expScore = 0;
    gameState.goldScore = 0;
    gameState.itemCount = 0;
    gameState.items = [];
    gameState.totalScore = 0;
    gameState.isGameOver = false;
    gameState.messageQueue = [];
    gameState.messageProcessing = false;
    
    // UIのリセット
    document.querySelector('.message-content').innerHTML = '';
    document.querySelector('.player-container').innerHTML = '';
    document.querySelector('.enemy-container').innerHTML = '';
    document.querySelector('.effects').innerHTML = '';
    updateScoreUI();
    
    // スタート画面の表示
    document.querySelector('.start-screen').style.display = 'flex';
}
(module
  (type (;0;) (func (param i32) (result i32)))
  (type (;1;) (func (param i32)))
  (type (;2;) (func (param f64) (result f64)))
  (type (;3;) (func (param f64 f64) (result f64)))
  (type (;4;) (func (param f32 f32) (result f32)))
  (type (;5;) (func))
  (type (;6;) (func (param f64 f64) (result i32)))
  (type (;7;) (func (param i32 f64 f64)))
  (type (;8;) (func (param i32 i32)))
  (type (;9;) (func (param i32 f64 f64) (result i32)))
  (type (;10;) (func (param i32 i32) (result i32)))
  (type (;11;) (func (param i32 f64 f64 f64) (result i32)))
  (type (;12;) (func (param i32 i32 f64) (result i32)))
  (type (;13;) (func (param i32 f64 f64 f64)))
  (type (;14;) (func (param i32 f64)))
  (type (;15;) (func (param i32 f64 f64) (result f64)))
  (type (;16;) (func (param i32 i32) (result f64)))
  (type (;17;) (func (param i32) (result f64)))
  (type (;18;) (func (param f64 f64 f64 f64) (result i32)))
  (type (;19;) (func (param i32 f64 f64 f64 f64)))
  (type (;20;) (func (param i32 f64 f64 f64 f64) (result i32)))
  (type (;21;) (func (param i32 f64 f64 f64 f64 f64) (result i32)))
  (type (;22;) (func (param i32 f64 f64 f64 f64) (result f64)))
  (type (;23;) (func (result i32)))
  (type (;24;) (func (param i32 i32 f64 f64 f64)))
  (type (;25;) (func (param i32) (result f32)))
  (type (;26;) (func (param i32 i32 f64 f64 f64 f64)))
  (type (;27;) (func (param f64 f64 i32) (result i32)))
  (type (;28;) (func (param i32 f64 f64 i32 i32)))
  (type (;29;) (func (param i32 f64 f64 i32)))
  (import "env" "memory" (memory (;0;) 2 32768 shared))
  (import "env" "malloc" (func (;0;) (type 0)))
  (import "env" "free" (func (;1;) (type 1)))
  (import "env" "sin" (func (;2;) (type 2)))
  (import "env" "cos" (func (;3;) (type 2)))
  (import "env" "fmax" (func (;4;) (type 3)))
  (import "env" "fmin" (func (;5;) (type 3)))
  (import "env" "fminf" (func (;6;) (type 4)))
  (import "env" "fmaxf" (func (;7;) (type 4)))
  (func (;8;) (type 5)
    block  ;; label = @1
      block  ;; label = @2
        block  ;; label = @3
          i32.const 1224
          i32.const 0
          i32.const 1
          i32.atomic.rmw.cmpxchg
          br_table 0 (;@3;) 1 (;@2;) 2 (;@1;)
        end
        i32.const 1024
        i32.const 0
        i32.const 200
        memory.fill
        i32.const 1224
        i32.const 2
        i32.atomic.store
        i32.const 1224
        i32.const -1
        memory.atomic.notify
        drop
        br 1 (;@1;)
      end
      i32.const 1224
      i32.const 1
      i64.const -1
      memory.atomic.wait32
      drop
    end)
  (func (;9;) (type 6) (param f64 f64) (result i32)
    (local i32)
    i32.const 8
    call 0
    local.tee 2
    local.get 1
    f32.demote_f64
    f32.store offset=4
    local.get 2
    local.get 0
    f32.demote_f64
    f32.store
    local.get 2)
  (func (;10;) (type 0) (param i32) (result i32)
    local.get 0)
  (func (;11;) (type 1) (param i32)
    local.get 0
    call 1)
  (func (;12;) (type 0) (param i32) (result i32)
    (local i64)
    local.get 0
    i64.load align=4
    local.set 1
    i32.const 8
    call 0
    local.tee 0
    local.get 1
    i64.store align=4
    local.get 0)
  (func (;13;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 2
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 1
    f32.demote_f64
    f32.store)
  (func (;14;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    i64.load align=4
    i64.store align=4)
  (func (;15;) (type 1) (param i32)
    local.get 0
    i64.const 0
    i64.store align=4)
  (func (;16;) (type 0) (param i32) (result i32)
    (local i32)
    i32.const 0
    local.set 1
    block  ;; label = @1
      local.get 0
      f32.load
      f32.const 0x0p+0 (;=0;)
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f32.const 0x0p+0 (;=0;)
      f32.eq
      local.set 1
    end
    local.get 1)
  (func (;17;) (type 9) (param i32 f64 f64) (result i32)
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.eq
      br_if 0 (;@1;)
      i32.const 0
      return
    end
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.eq)
  (func (;18;) (type 10) (param i32 i32) (result i32)
    block  ;; label = @1
      local.get 0
      f32.load
      local.get 1
      f32.load
      f32.eq
      br_if 0 (;@1;)
      i32.const 0
      return
    end
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    f32.eq)
  (func (;19;) (type 11) (param i32 f64 f64 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 4
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.sub
      f64.abs
      local.get 3
      f64.lt
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      f64.sub
      f64.abs
      local.get 3
      f64.lt
      local.set 4
    end
    local.get 4)
  (func (;20;) (type 12) (param i32 i32 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 3
    block  ;; label = @1
      local.get 0
      f32.load
      local.get 1
      f32.load
      f32.sub
      f32.abs
      f64.promote_f32
      local.get 2
      f64.lt
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      local.get 1
      f32.load offset=4
      f32.sub
      f32.abs
      f64.promote_f32
      local.get 2
      f64.lt
      local.set 3
    end
    local.get 3)
  (func (;21;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.neg
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.neg
    f32.store offset=4)
  (func (;22;) (type 1) (param i32)
    local.get 0
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load
    f32.div
    f32.store
    local.get 0
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=4
    f32.div
    f32.store offset=4)
  (func (;23;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.abs
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.abs
    f32.store offset=4)
  (func (;24;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=4)
  (func (;25;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    f32.load
    local.get 0
    f32.load
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=4
    local.get 0
    f32.load offset=4
    f32.add
    f32.store offset=4)
  (func (;26;) (type 13) (param i32 f64 f64 f64)
    (local f32 f64 f64 f64)
    local.get 0
    f32.load
    local.set 4
    local.get 1
    call 2
    local.set 5
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 3
    f64.sub
    f32.demote_f64
    f64.promote_f32
    local.tee 6
    local.get 1
    call 3
    local.tee 1
    f64.mul
    local.get 5
    local.get 4
    f64.promote_f32
    local.get 2
    f64.sub
    f32.demote_f64
    f64.promote_f32
    local.tee 7
    f64.mul
    f64.sub
    local.get 3
    f64.add
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 7
    local.get 1
    f64.mul
    local.get 5
    local.get 6
    f64.mul
    f64.add
    local.get 2
    f64.add
    f32.demote_f64
    f32.store)
  (func (;27;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=4)
  (func (;28;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    f32.load
    local.get 0
    f32.load
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=4
    local.get 0
    f32.load offset=4
    f32.add
    f32.store offset=4)
  (func (;29;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.sub
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.sub
    f32.demote_f64
    f32.store offset=4)
  (func (;30;) (type 8) (param i32 i32)
    local.get 0
    local.get 0
    f32.load
    local.get 1
    f32.load
    f32.sub
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    f32.sub
    f32.store offset=4)
  (func (;31;) (type 14) (param i32 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store offset=4)
  (func (;32;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.mul
    f32.demote_f64
    f32.store offset=4)
  (func (;33;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    f32.load
    local.get 0
    f32.load
    f32.mul
    f32.store
    local.get 0
    local.get 1
    f32.load offset=4
    local.get 0
    f32.load offset=4
    f32.mul
    f32.store offset=4)
  (func (;34;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.floor
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.floor
    f32.store offset=4)
  (func (;35;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.ceil
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.ceil
    f32.store offset=4)
  (func (;36;) (type 1) (param i32)
    (local f32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=4)
  (func (;37;) (type 1) (param i32)
    (local f32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=4)
  (func (;38;) (type 15) (param i32 f64 f64) (result f64)
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.mul
    f64.add)
  (func (;39;) (type 16) (param i32 i32) (result f64)
    local.get 0
    f32.load
    local.get 1
    f32.load
    f32.mul
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    f32.mul
    f32.add
    f64.promote_f32)
  (func (;40;) (type 17) (param i32) (result f64)
    (local f32)
    local.get 0
    f32.load
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load offset=4
    local.tee 1
    local.get 1
    f32.mul
    f32.add
    f64.promote_f32)
  (func (;41;) (type 17) (param i32) (result f64)
    (local f32)
    local.get 0
    f32.load
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load offset=4
    local.tee 1
    local.get 1
    f32.mul
    f32.add
    f64.promote_f32
    f64.sqrt)
  (func (;42;) (type 1) (param i32)
    (local f32 f32 f64)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.const 0x0p+0 (;=0;)
        f32.ne
        br_if 0 (;@2;)
        local.get 0
        f32.load offset=4
        f32.const 0x0p+0 (;=0;)
        f32.eq
        br_if 1 (;@1;)
      end
      local.get 0
      f64.const 0x1p+0 (;=1;)
      local.get 1
      local.get 1
      f32.mul
      local.get 0
      f32.load offset=4
      local.tee 2
      local.get 2
      f32.mul
      f32.add
      f64.promote_f32
      f64.sqrt
      f64.div
      local.tee 3
      local.get 2
      f64.promote_f32
      f64.mul
      f32.demote_f64
      f32.store offset=4
      local.get 0
      local.get 3
      local.get 1
      f64.promote_f32
      f64.mul
      f32.demote_f64
      f32.store
    end)
  (func (;43;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.abs
    local.get 0
    f32.load offset=4
    f32.abs
    f32.gt
    i32.const 2
    i32.shl
    i32.add
    i32.const 0
    i32.store)
  (func (;44;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.abs
    local.get 0
    f32.load offset=4
    f32.abs
    f32.lt
    i32.const 2
    i32.shl
    i32.add
    i32.const 0
    i32.store)
  (func (;45;) (type 1) (param i32)
    (local f32)
    local.get 0
    f32.const -0x1p+0 (;=-1;)
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load
    local.tee 1
    f32.const 0x0p+0 (;=0;)
    f32.lt
    select
    f32.const 0x0p+0 (;=0;)
    local.get 1
    f32.const 0x0p+0 (;=0;)
    f32.ne
    select
    f32.store
    local.get 0
    f32.const -0x1p+0 (;=-1;)
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=4
    local.tee 1
    f32.const 0x0p+0 (;=0;)
    f32.lt
    select
    f32.const 0x0p+0 (;=0;)
    local.get 1
    f32.const 0x0p+0 (;=0;)
    f32.ne
    select
    f32.store offset=4)
  (func (;46;) (type 18) (param f64 f64 f64 f64) (result i32)
    (local i32)
    i32.const 16
    call 0
    local.tee 4
    local.get 3
    f32.demote_f64
    f32.store offset=12
    local.get 4
    local.get 2
    f32.demote_f64
    f32.store offset=8
    local.get 4
    local.get 1
    f32.demote_f64
    f32.store offset=4
    local.get 4
    local.get 0
    f32.demote_f64
    f32.store
    local.get 4)
  (func (;47;) (type 0) (param i32) (result i32)
    local.get 0)
  (func (;48;) (type 1) (param i32)
    local.get 0
    call 1)
  (func (;49;) (type 0) (param i32) (result i32)
    (local i64 i64)
    local.get 0
    i64.load align=4
    local.set 1
    local.get 0
    i64.load offset=8 align=4
    local.set 2
    i32.const 16
    call 0
    local.tee 0
    local.get 2
    i64.store offset=8 align=4
    local.get 0
    local.get 1
    i64.store align=4
    local.get 0)
  (func (;50;) (type 19) (param i32 f64 f64 f64 f64)
    local.get 0
    local.get 4
    f32.demote_f64
    f32.store offset=12
    local.get 0
    local.get 3
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 2
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 1
    f32.demote_f64
    f32.store)
  (func (;51;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    i64.load align=4
    i64.store align=4
    local.get 0
    local.get 1
    i64.load offset=8 align=4
    i64.store offset=8 align=4)
  (func (;52;) (type 1) (param i32)
    local.get 0
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    i64.const 0
    i64.store align=4)
  (func (;53;) (type 0) (param i32) (result i32)
    (local i32)
    i32.const 0
    local.set 1
    block  ;; label = @1
      local.get 0
      f32.load
      f32.const 0x0p+0 (;=0;)
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f32.const 0x0p+0 (;=0;)
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f32.const 0x0p+0 (;=0;)
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f32.const 0x0p+0 (;=0;)
      f32.eq
      local.set 1
    end
    local.get 1)
  (func (;54;) (type 20) (param i32 f64 f64 f64 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 5
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f64.promote_f32
      local.get 3
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.get 4
      f64.eq
      local.set 5
    end
    local.get 5)
  (func (;55;) (type 9) (param i32 f64 f64) (result i32)
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.eq
      br_if 0 (;@1;)
      i32.const 0
      return
    end
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.eq)
  (func (;56;) (type 10) (param i32 i32) (result i32)
    (local i32)
    i32.const 0
    local.set 2
    block  ;; label = @1
      local.get 0
      f32.load
      local.get 1
      f32.load
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      local.get 1
      f32.load offset=4
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      local.get 1
      f32.load offset=8
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      local.get 1
      f32.load offset=12
      f32.eq
      local.set 2
    end
    local.get 2)
  (func (;57;) (type 21) (param i32 f64 f64 f64 f64 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 6
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.sub
      f64.abs
      local.get 5
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      f64.sub
      f64.abs
      local.get 5
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f64.promote_f32
      local.get 3
      f64.sub
      f64.abs
      local.get 5
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.get 4
      f64.sub
      f64.abs
      local.get 5
      f64.le
      local.set 6
    end
    local.get 6)
  (func (;58;) (type 11) (param i32 f64 f64 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 4
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.sub
      f64.abs
      local.get 3
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      f64.sub
      f64.abs
      local.get 3
      f64.le
      local.set 4
    end
    local.get 4)
  (func (;59;) (type 12) (param i32 i32 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 3
    block  ;; label = @1
      local.get 0
      f32.load
      local.get 1
      f32.load
      f32.sub
      f32.abs
      f64.promote_f32
      local.get 2
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      local.get 1
      f32.load offset=4
      f32.sub
      f32.abs
      f64.promote_f32
      local.get 2
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      local.get 1
      f32.load offset=8
      f32.sub
      f32.abs
      f64.promote_f32
      local.get 2
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      local.get 1
      f32.load offset=12
      f32.sub
      f32.abs
      f64.promote_f32
      local.get 2
      f64.le
      local.set 3
    end
    local.get 3)
  (func (;60;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.neg
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.neg
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f32.neg
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f32.neg
    f32.store offset=12)
  (func (;61;) (type 1) (param i32)
    local.get 0
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load
    f32.div
    f32.store
    local.get 0
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=4
    f32.div
    f32.store offset=4
    local.get 0
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=8
    f32.div
    f32.store offset=8
    local.get 0
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=12
    f32.div
    f32.store offset=12)
  (func (;62;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.abs
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.abs
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f32.abs
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f32.abs
    f32.store offset=12)
  (func (;63;) (type 19) (param i32 f64 f64 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 3
    f64.add
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 4
    f64.add
    f32.demote_f64
    f32.store offset=12)
  (func (;64;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=4)
  (func (;65;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    f32.load
    local.get 0
    f32.load
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=4
    local.get 0
    f32.load offset=4
    f32.add
    f32.store offset=4
    local.get 0
    local.get 1
    f32.load offset=8
    local.get 0
    f32.load offset=8
    f32.add
    f32.store offset=8
    local.get 0
    local.get 1
    f32.load offset=12
    local.get 0
    f32.load offset=12
    f32.add
    f32.store offset=12)
  (func (;66;) (type 19) (param i32 f64 f64 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 3
    f64.add
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 4
    f64.add
    f32.demote_f64
    f32.store offset=12)
  (func (;67;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=4)
  (func (;68;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    f32.load
    local.get 0
    f32.load
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=4
    local.get 0
    f32.load offset=4
    f32.add
    f32.store offset=4
    local.get 0
    local.get 1
    f32.load offset=8
    local.get 0
    f32.load offset=8
    f32.add
    f32.store offset=8
    local.get 0
    local.get 1
    f32.load offset=12
    local.get 0
    f32.load offset=12
    f32.add
    f32.store offset=12)
  (func (;69;) (type 19) (param i32 f64 f64 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.sub
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.sub
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 3
    f64.sub
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 4
    f64.sub
    f32.demote_f64
    f32.store offset=12)
  (func (;70;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.sub
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.sub
    f32.demote_f64
    f32.store offset=4)
  (func (;71;) (type 8) (param i32 i32)
    local.get 0
    local.get 0
    f32.load
    local.get 1
    f32.load
    f32.sub
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    f32.sub
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    local.get 1
    f32.load offset=8
    f32.sub
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    local.get 1
    f32.load offset=12
    f32.sub
    f32.store offset=12)
  (func (;72;) (type 19) (param i32 f64 f64 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.mul
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 3
    f64.mul
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 4
    f64.mul
    f32.demote_f64
    f32.store offset=12)
  (func (;73;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.mul
    f32.demote_f64
    f32.store offset=4)
  (func (;74;) (type 14) (param i32 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 1
    f64.mul
    f32.demote_f64
    f32.store offset=12)
  (func (;75;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    f32.load
    local.get 0
    f32.load
    f32.mul
    f32.store
    local.get 0
    local.get 1
    f32.load offset=4
    local.get 0
    f32.load offset=4
    f32.mul
    f32.store offset=4
    local.get 0
    local.get 1
    f32.load offset=8
    local.get 0
    f32.load offset=8
    f32.mul
    f32.store offset=8
    local.get 0
    local.get 1
    f32.load offset=12
    local.get 0
    f32.load offset=12
    f32.mul
    f32.store offset=12)
  (func (;76;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.floor
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.floor
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f32.floor
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f32.floor
    f32.store offset=12)
  (func (;77;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.ceil
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.ceil
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f32.ceil
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f32.ceil
    f32.store offset=12)
  (func (;78;) (type 1) (param i32)
    (local f32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=4
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=8
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=8
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=12
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=12)
  (func (;79;) (type 1) (param i32)
    (local f32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=4
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=8
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=8
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=12
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=12)
  (func (;80;) (type 22) (param i32 f64 f64 f64 f64) (result f64)
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 4
    f64.mul
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 3
    f64.mul
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.mul
    f64.add
    f64.add
    f64.add)
  (func (;81;) (type 15) (param i32 f64 f64) (result f64)
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.mul
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.mul
    f64.add)
  (func (;82;) (type 16) (param i32 i32) (result f64)
    local.get 0
    f32.load offset=12
    local.get 1
    f32.load offset=12
    f32.mul
    local.get 0
    f32.load offset=8
    local.get 1
    f32.load offset=8
    f32.mul
    local.get 0
    f32.load
    local.get 1
    f32.load
    f32.mul
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    f32.mul
    f32.add
    f32.add
    f32.add
    f64.promote_f32)
  (func (;83;) (type 17) (param i32) (result f64)
    (local f32)
    local.get 0
    f32.load offset=12
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load offset=8
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load offset=4
    local.tee 1
    local.get 1
    f32.mul
    f32.add
    f32.add
    f32.add
    f64.promote_f32)
  (func (;84;) (type 17) (param i32) (result f64)
    (local f32)
    local.get 0
    f32.load offset=12
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load offset=8
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load
    local.tee 1
    local.get 1
    f32.mul
    local.get 0
    f32.load offset=4
    local.tee 1
    local.get 1
    f32.mul
    f32.add
    f32.add
    f32.add
    f64.promote_f32
    f64.sqrt)
  (func (;85;) (type 1) (param i32)
    (local f32 f32 f32 f32 f64)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.const 0x0p+0 (;=0;)
        f32.ne
        br_if 0 (;@2;)
        local.get 0
        f32.load offset=4
        f32.const 0x0p+0 (;=0;)
        f32.ne
        br_if 0 (;@2;)
        local.get 0
        f32.load offset=8
        f32.const 0x0p+0 (;=0;)
        f32.ne
        br_if 0 (;@2;)
        local.get 0
        f32.load offset=12
        f32.const 0x0p+0 (;=0;)
        f32.eq
        br_if 1 (;@1;)
      end
      local.get 0
      f64.const 0x1p+0 (;=1;)
      local.get 0
      f32.load offset=12
      local.tee 2
      local.get 2
      f32.mul
      local.get 0
      f32.load offset=8
      local.tee 3
      local.get 3
      f32.mul
      local.get 1
      local.get 1
      f32.mul
      local.get 0
      f32.load offset=4
      local.tee 4
      local.get 4
      f32.mul
      f32.add
      f32.add
      f32.add
      f64.promote_f32
      f64.sqrt
      f64.div
      local.tee 5
      local.get 2
      f64.promote_f32
      f64.mul
      f32.demote_f64
      f32.store offset=12
      local.get 0
      local.get 5
      local.get 3
      f64.promote_f32
      f64.mul
      f32.demote_f64
      f32.store offset=8
      local.get 0
      local.get 5
      local.get 4
      f64.promote_f32
      f64.mul
      f32.demote_f64
      f32.store offset=4
      local.get 0
      local.get 5
      local.get 1
      f64.promote_f32
      f64.mul
      f32.demote_f64
      f32.store
    end)
  (func (;86;) (type 1) (param i32)
    (local i32 f32 f32 f32 f32)
    local.get 0
    i32.const 12
    i32.add
    local.set 1
    local.get 0
    f32.load offset=12
    f32.abs
    local.set 2
    local.get 0
    f32.load offset=8
    f32.abs
    local.set 3
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        f32.abs
        local.tee 4
        local.get 0
        f32.load offset=4
        f32.abs
        local.tee 5
        f32.gt
        i32.eqz
        br_if 0 (;@2;)
        local.get 4
        local.get 3
        f32.gt
        i32.eqz
        br_if 0 (;@2;)
        local.get 4
        local.get 2
        f32.gt
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        i64.const 0
        i64.store offset=4 align=4
        br 1 (;@1;)
      end
      block  ;; label = @2
        local.get 5
        local.get 4
        f32.gt
        i32.eqz
        br_if 0 (;@2;)
        local.get 5
        local.get 3
        f32.gt
        i32.eqz
        br_if 0 (;@2;)
        local.get 5
        local.get 2
        f32.gt
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        i32.const 0
        i32.store offset=8
        local.get 0
        i32.const 0
        i32.store
        br 1 (;@1;)
      end
      local.get 0
      i64.const 0
      i64.store align=4
      local.get 1
      local.get 0
      i32.const 8
      i32.add
      local.tee 0
      local.get 3
      local.get 2
      f32.gt
      select
      local.get 0
      local.get 3
      local.get 5
      f32.gt
      select
      local.get 0
      local.get 3
      local.get 4
      f32.gt
      select
      local.set 1
    end
    local.get 1
    i32.const 0
    i32.store)
  (func (;87;) (type 1) (param i32)
    (local i32 f32 f32 f32 f32)
    local.get 0
    i32.const 12
    i32.add
    local.set 1
    local.get 0
    f32.load offset=12
    f32.abs
    local.set 2
    local.get 0
    f32.load offset=8
    f32.abs
    local.set 3
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        f32.abs
        local.tee 4
        local.get 0
        f32.load offset=4
        f32.abs
        local.tee 5
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 4
        local.get 3
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 4
        local.get 2
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        i64.const 0
        i64.store offset=4 align=4
        br 1 (;@1;)
      end
      block  ;; label = @2
        local.get 5
        local.get 4
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 5
        local.get 3
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 5
        local.get 2
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        i32.const 0
        i32.store offset=8
        local.get 0
        i32.const 0
        i32.store
        br 1 (;@1;)
      end
      local.get 0
      i64.const 0
      i64.store align=4
      local.get 1
      local.get 0
      i32.const 8
      i32.add
      local.tee 0
      local.get 3
      local.get 2
      f32.lt
      select
      local.get 0
      local.get 3
      local.get 5
      f32.lt
      select
      local.get 0
      local.get 3
      local.get 4
      f32.lt
      select
      local.set 1
    end
    local.get 1
    i32.const 0
    i32.store)
  (func (;88;) (type 1) (param i32)
    (local f32)
    local.get 0
    f32.const -0x1p+0 (;=-1;)
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load
    local.tee 1
    f32.const 0x0p+0 (;=0;)
    f32.lt
    select
    f32.const 0x0p+0 (;=0;)
    local.get 1
    f32.const 0x0p+0 (;=0;)
    f32.ne
    select
    f32.store
    local.get 0
    f32.const -0x1p+0 (;=-1;)
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=4
    local.tee 1
    f32.const 0x0p+0 (;=0;)
    f32.lt
    select
    f32.const 0x0p+0 (;=0;)
    local.get 1
    f32.const 0x0p+0 (;=0;)
    f32.ne
    select
    f32.store offset=4
    local.get 0
    f32.const -0x1p+0 (;=-1;)
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=8
    local.tee 1
    f32.const 0x0p+0 (;=0;)
    f32.lt
    select
    f32.const 0x0p+0 (;=0;)
    local.get 1
    f32.const 0x0p+0 (;=0;)
    f32.ne
    select
    f32.store offset=8
    local.get 0
    f32.const -0x1p+0 (;=-1;)
    f32.const 0x1p+0 (;=1;)
    local.get 0
    f32.load offset=12
    local.tee 1
    f32.const 0x0p+0 (;=0;)
    f32.lt
    select
    f32.const 0x0p+0 (;=0;)
    local.get 1
    f32.const 0x0p+0 (;=0;)
    f32.ne
    select
    f32.store offset=12)
  (func (;89;) (type 23) (result i32)
    i32.const 36
    call 0)
  (func (;90;) (type 0) (param i32) (result i32)
    local.get 0)
  (func (;91;) (type 1) (param i32)
    local.get 0
    call 1)
  (func (;92;) (type 0) (param i32) (result i32)
    (local i32)
    i32.const 36
    call 0
    local.tee 1
    i32.const 32
    i32.add
    local.get 0
    i32.const 32
    i32.add
    i32.load
    i32.store
    local.get 1
    i32.const 24
    i32.add
    local.get 0
    i32.const 24
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 16
    i32.add
    local.get 0
    i32.const 16
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 8
    i32.add
    local.get 0
    i32.const 8
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    local.get 0
    i64.load align=4
    i64.store align=4
    local.get 1)
  (func (;93;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 32
    i32.add
    local.get 1
    i32.const 32
    i32.add
    i32.load
    i32.store
    local.get 0
    i32.const 24
    i32.add
    local.get 1
    i32.const 24
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 16
    i32.add
    local.get 1
    i32.const 16
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    local.get 1
    i32.const 8
    i32.add
    i64.load align=4
    i64.store align=4)
  (func (;94;) (type 14) (param i32 f64)
    (local f32 i32)
    local.get 1
    f32.demote_f64
    local.set 2
    i32.const 0
    local.set 3
    loop  ;; label = @1
      local.get 0
      local.get 3
      i32.add
      local.get 2
      f32.store
      local.get 3
      i32.const 4
      i32.add
      local.tee 3
      i32.const 36
      i32.ne
      br_if 0 (;@1;)
    end)
  (func (;95;) (type 14) (param i32 f64)
    (local f32 i32)
    local.get 1
    f32.demote_f64
    local.set 2
    i32.const -4
    local.set 3
    loop  ;; label = @1
      local.get 0
      local.get 2
      f32.store
      local.get 0
      i32.const 16
      i32.add
      local.set 0
      local.get 3
      i32.const 4
      i32.add
      local.tee 3
      i32.const 5
      i32.lt_u
      br_if 0 (;@1;)
    end)
  (func (;96;) (type 24) (param i32 i32 f64 f64 f64)
    block  ;; label = @1
      local.get 1
      i32.const 2
      i32.gt_u
      br_if 0 (;@1;)
      local.get 0
      local.get 1
      i32.const 12
      i32.mul
      i32.add
      local.tee 1
      local.get 4
      f32.demote_f64
      f32.store offset=8
      local.get 1
      local.get 3
      f32.demote_f64
      f32.store offset=4
      local.get 1
      local.get 2
      f32.demote_f64
      f32.store
    end)
  (func (;97;) (type 24) (param i32 i32 f64 f64 f64)
    block  ;; label = @1
      local.get 1
      i32.const 2
      i32.gt_u
      br_if 0 (;@1;)
      local.get 0
      local.get 1
      i32.const 2
      i32.shl
      i32.add
      local.tee 1
      local.get 4
      f32.demote_f64
      f32.store offset=24
      local.get 1
      local.get 3
      f32.demote_f64
      f32.store offset=12
      local.get 1
      local.get 2
      f32.demote_f64
      f32.store
    end)
  (func (;98;) (type 1) (param i32)
    (local i32)
    local.get 0
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 32
    i32.add
    i32.const 0
    i32.store
    local.get 0
    i32.const 24
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 16
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    i64.const 0
    i64.store align=4
    i32.const -4
    local.set 1
    loop  ;; label = @1
      local.get 0
      i32.const 1065353216
      i32.store
      local.get 0
      i32.const 16
      i32.add
      local.set 0
      local.get 1
      i32.const 4
      i32.add
      local.tee 1
      i32.const 5
      i32.lt_u
      br_if 0 (;@1;)
    end)
  (func (;99;) (type 14) (param i32 f64)
    (local i32 i32)
    i32.const 0
    local.set 2
    loop  ;; label = @1
      local.get 0
      local.get 2
      i32.add
      local.tee 3
      local.get 3
      f32.load
      f64.promote_f32
      local.get 1
      f64.mul
      f32.demote_f64
      f32.store
      local.get 2
      i32.const 4
      i32.add
      local.tee 2
      i32.const 36
      i32.ne
      br_if 0 (;@1;)
    end)
  (func (;100;) (type 1) (param i32)
    (local i32 i32 i32 i32 i32)
    i32.const 0
    local.set 1
    i32.const 0
    i64.const 0
    i64.store offset=1048 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1040 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1032 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1024 align=4
    i32.const 0
    i32.const 0
    i32.store offset=1056
    i32.const 1024
    local.set 2
    local.get 0
    local.set 3
    loop  ;; label = @1
      local.get 3
      local.set 4
      i32.const 0
      local.set 5
      loop  ;; label = @2
        local.get 2
        local.get 5
        i32.add
        local.get 4
        f32.load
        f32.store
        local.get 4
        i32.const 12
        i32.add
        local.set 4
        local.get 5
        i32.const 4
        i32.add
        local.tee 5
        i32.const 12
        i32.ne
        br_if 0 (;@2;)
      end
      local.get 3
      i32.const 4
      i32.add
      local.set 3
      local.get 2
      i32.const 12
      i32.add
      local.set 2
      local.get 1
      i32.const 1
      i32.add
      local.tee 1
      i32.const 3
      i32.ne
      br_if 0 (;@1;)
    end
    local.get 0
    i32.const 32
    i32.add
    i32.const 0
    i32.load offset=1056
    i32.store
    local.get 0
    i32.const 24
    i32.add
    i32.const 0
    i64.load offset=1048 align=4
    i64.store align=4
    local.get 0
    i32.const 16
    i32.add
    i32.const 0
    i64.load offset=1040 align=4
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    i32.const 0
    i64.load offset=1032 align=4
    i64.store align=4
    local.get 0
    i32.const 0
    i64.load offset=1024 align=4
    i64.store align=4)
  (func (;101;) (type 25) (param i32) (result f32)
    (local f32 f32 f32 f32 f32)
    local.get 0
    f32.load offset=8
    local.get 0
    f32.load offset=12
    local.tee 1
    local.get 0
    f32.load offset=28
    local.tee 2
    f32.mul
    local.get 0
    f32.load offset=24
    local.tee 3
    local.get 0
    f32.load offset=16
    local.tee 4
    f32.mul
    f32.sub
    f32.mul
    local.get 0
    f32.load
    local.get 4
    local.get 0
    f32.load offset=32
    local.tee 5
    f32.mul
    local.get 2
    local.get 0
    f32.load offset=20
    local.tee 4
    f32.mul
    f32.sub
    f32.mul
    local.get 1
    local.get 5
    f32.mul
    local.get 3
    local.get 4
    f32.mul
    f32.sub
    local.get 0
    f32.load offset=4
    f32.mul
    f32.sub
    f32.add)
  (func (;102;) (type 8) (param i32 i32)
    (local i32 i32 i32 i32 f32 f32 f32)
    i32.const 0
    local.get 0
    i32.const 8
    i32.add
    local.tee 2
    i64.load align=4
    i64.store offset=1032 align=4
    i32.const 0
    local.get 0
    i64.load align=4
    i64.store offset=1024 align=4
    i32.const 0
    local.get 0
    i32.const 32
    i32.add
    local.tee 3
    i32.load
    i32.store offset=1056
    i32.const 0
    local.get 0
    i32.const 24
    i32.add
    local.tee 4
    i64.load align=4
    i64.store offset=1048 align=4
    i32.const 0
    local.get 0
    i32.const 16
    i32.add
    local.tee 5
    i64.load align=4
    i64.store offset=1040 align=4
    local.get 0
    local.get 1
    f32.load offset=8
    i32.const 0
    f32.load offset=1048
    f32.mul
    local.get 1
    f32.load
    i32.const 0
    f32.load offset=1024
    f32.mul
    local.get 1
    f32.load offset=4
    i32.const 0
    f32.load offset=1036
    f32.mul
    f32.add
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=8
    i32.const 0
    f32.load offset=1052
    f32.mul
    local.get 1
    f32.load
    i32.const 0
    f32.load offset=1028
    f32.mul
    local.get 1
    f32.load offset=4
    i32.const 0
    f32.load offset=1040
    f32.mul
    f32.add
    f32.add
    f32.store offset=4
    local.get 2
    local.get 1
    f32.load offset=8
    i32.const 0
    f32.load offset=1056
    f32.mul
    local.get 1
    f32.load
    i32.const 0
    f32.load offset=1032
    f32.mul
    local.get 1
    f32.load offset=4
    i32.const 0
    f32.load offset=1044
    f32.mul
    f32.add
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=20
    i32.const 0
    f32.load offset=1048
    f32.mul
    local.get 1
    f32.load offset=12
    i32.const 0
    f32.load offset=1024
    local.tee 6
    f32.mul
    local.get 1
    f32.load offset=16
    i32.const 0
    f32.load offset=1036
    f32.mul
    f32.add
    f32.add
    f32.store offset=12
    local.get 5
    local.get 1
    f32.load offset=20
    i32.const 0
    f32.load offset=1052
    f32.mul
    local.get 1
    f32.load offset=12
    i32.const 0
    f32.load offset=1028
    local.tee 7
    f32.mul
    local.get 1
    f32.load offset=16
    i32.const 0
    f32.load offset=1040
    f32.mul
    f32.add
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=20
    i32.const 0
    f32.load offset=1056
    f32.mul
    local.get 1
    f32.load offset=12
    i32.const 0
    f32.load offset=1032
    local.tee 8
    f32.mul
    local.get 1
    f32.load offset=16
    i32.const 0
    f32.load offset=1044
    f32.mul
    f32.add
    f32.add
    f32.store offset=20
    local.get 4
    local.get 1
    f32.load offset=32
    i32.const 0
    f32.load offset=1048
    f32.mul
    local.get 6
    local.get 1
    f32.load offset=24
    f32.mul
    local.get 1
    f32.load offset=28
    i32.const 0
    f32.load offset=1036
    f32.mul
    f32.add
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=32
    i32.const 0
    f32.load offset=1052
    f32.mul
    local.get 7
    local.get 1
    f32.load offset=24
    f32.mul
    local.get 1
    f32.load offset=28
    i32.const 0
    f32.load offset=1040
    f32.mul
    f32.add
    f32.add
    f32.store offset=28
    local.get 3
    local.get 1
    f32.load offset=32
    i32.const 0
    f32.load offset=1056
    f32.mul
    local.get 8
    local.get 1
    f32.load offset=24
    f32.mul
    local.get 1
    f32.load offset=28
    i32.const 0
    f32.load offset=1044
    f32.mul
    f32.add
    f32.add
    f32.store)
  (func (;103;) (type 7) (param i32 f64 f64)
    (local i32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 1
        f64.const 0x0p+0 (;=0;)
        f64.ne
        br_if 0 (;@2;)
        local.get 2
        f64.const 0x0p+0 (;=0;)
        f64.eq
        br_if 1 (;@1;)
      end
      i32.const 0
      local.get 0
      i64.load align=4
      i64.store offset=1024 align=4
      i32.const 0
      local.get 0
      i32.const 8
      i32.add
      i64.load align=4
      i64.store offset=1032 align=4
      i32.const 0
      local.get 0
      i32.const 24
      i32.add
      local.tee 3
      i64.load align=4
      i64.store offset=1048 align=4
      i32.const 0
      local.get 0
      i32.const 32
      i32.add
      local.tee 4
      i32.load
      i32.store offset=1056
      i32.const 0
      local.get 0
      i32.const 16
      i32.add
      i64.load align=4
      i64.store offset=1040 align=4
      local.get 3
      local.get 1
      i32.const 0
      f32.load offset=1024
      f64.promote_f32
      f64.mul
      i32.const 0
      f32.load offset=1036
      f64.promote_f32
      local.get 2
      f64.mul
      f64.add
      i32.const 0
      f32.load offset=1048
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store
      local.get 0
      local.get 1
      i32.const 0
      f32.load offset=1028
      f64.promote_f32
      f64.mul
      i32.const 0
      f32.load offset=1040
      f64.promote_f32
      local.get 2
      f64.mul
      f64.add
      i32.const 0
      f32.load offset=1052
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store offset=28
      local.get 4
      local.get 1
      i32.const 0
      f32.load offset=1032
      f64.promote_f32
      f64.mul
      i32.const 0
      f32.load offset=1044
      f64.promote_f32
      local.get 2
      f64.mul
      f64.add
      i32.const 0
      f32.load offset=1056
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store
    end)
  (func (;104;) (type 14) (param i32 f64)
    (local i32 i32 f32 f32)
    block  ;; label = @1
      local.get 1
      f64.const 0x0p+0 (;=0;)
      f64.eq
      br_if 0 (;@1;)
      i32.const 0
      i64.const 0
      i64.store offset=1084 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1076 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1068 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1060 align=4
      i32.const 0
      i32.const 0
      i32.store offset=1092
      i32.const -4
      local.set 2
      i32.const 1060
      local.set 3
      loop  ;; label = @2
        local.get 3
        i32.const 1065353216
        i32.store
        local.get 3
        i32.const 16
        i32.add
        local.set 3
        local.get 2
        i32.const 4
        i32.add
        local.tee 2
        i32.const 5
        i32.lt_u
        br_if 0 (;@2;)
      end
      i32.const 0
      local.get 1
      call 3
      f32.demote_f64
      local.tee 4
      f32.store offset=1076
      i32.const 0
      local.get 1
      call 2
      f32.demote_f64
      local.tee 5
      f32.store offset=1072
      i32.const 0
      local.get 4
      f32.store offset=1060
      i32.const 0
      local.get 5
      f32.neg
      f32.store offset=1064
      local.get 0
      i32.const 1060
      call 102
    end)
  (func (;105;) (type 7) (param i32 f64 f64)
    (local i32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 1
        f64.const 0x1p+0 (;=1;)
        f64.ne
        br_if 0 (;@2;)
        local.get 2
        f64.const 0x1p+0 (;=1;)
        f64.eq
        br_if 1 (;@1;)
      end
      i32.const 0
      i64.const 0
      i64.store offset=1084 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1076 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1068 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1060 align=4
      i32.const 0
      i32.const 0
      i32.store offset=1092
      i32.const -4
      local.set 3
      i32.const 1060
      local.set 4
      loop  ;; label = @2
        local.get 4
        i32.const 1065353216
        i32.store
        local.get 4
        i32.const 16
        i32.add
        local.set 4
        local.get 3
        i32.const 4
        i32.add
        local.tee 3
        i32.const 5
        i32.lt_u
        br_if 0 (;@2;)
      end
      i32.const 0
      local.get 2
      f32.demote_f64
      f32.store offset=1076
      i32.const 0
      local.get 1
      f32.demote_f64
      f32.store offset=1060
      local.get 0
      i32.const 1060
      call 102
    end)
  (func (;106;) (type 23) (result i32)
    i32.const 64
    call 0)
  (func (;107;) (type 0) (param i32) (result i32)
    local.get 0)
  (func (;108;) (type 1) (param i32)
    local.get 0
    call 1)
  (func (;109;) (type 0) (param i32) (result i32)
    (local i32)
    i32.const 64
    call 0
    local.tee 1
    i32.const 56
    i32.add
    local.get 0
    i32.const 56
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 48
    i32.add
    local.get 0
    i32.const 48
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 40
    i32.add
    local.get 0
    i32.const 40
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 32
    i32.add
    local.get 0
    i32.const 32
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 24
    i32.add
    local.get 0
    i32.const 24
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 16
    i32.add
    local.get 0
    i32.const 16
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    i32.const 8
    i32.add
    local.get 0
    i32.const 8
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 1
    local.get 0
    i64.load align=4
    i64.store align=4
    local.get 1)
  (func (;110;) (type 8) (param i32 i32)
    local.get 0
    local.get 1
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 56
    i32.add
    local.get 1
    i32.const 56
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 48
    i32.add
    local.get 1
    i32.const 48
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 40
    i32.add
    local.get 1
    i32.const 40
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 32
    i32.add
    local.get 1
    i32.const 32
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 24
    i32.add
    local.get 1
    i32.const 24
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 16
    i32.add
    local.get 1
    i32.const 16
    i32.add
    i64.load align=4
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    local.get 1
    i32.const 8
    i32.add
    i64.load align=4
    i64.store align=4)
  (func (;111;) (type 14) (param i32 f64)
    (local f32 i32)
    local.get 1
    f32.demote_f64
    local.set 2
    i32.const 0
    local.set 3
    loop  ;; label = @1
      local.get 0
      local.get 3
      i32.add
      local.get 2
      f32.store
      local.get 3
      i32.const 4
      i32.add
      local.tee 3
      i32.const 64
      i32.ne
      br_if 0 (;@1;)
    end)
  (func (;112;) (type 14) (param i32 f64)
    (local f32 i32)
    local.get 1
    f32.demote_f64
    local.set 2
    i32.const -5
    local.set 3
    loop  ;; label = @1
      local.get 0
      local.get 2
      f32.store
      local.get 0
      i32.const 20
      i32.add
      local.set 0
      local.get 3
      i32.const 5
      i32.add
      local.tee 3
      i32.const 11
      i32.lt_u
      br_if 0 (;@1;)
    end)
  (func (;113;) (type 26) (param i32 i32 f64 f64 f64 f64)
    block  ;; label = @1
      local.get 1
      i32.const 3
      i32.gt_u
      br_if 0 (;@1;)
      local.get 0
      local.get 1
      i32.const 4
      i32.shl
      i32.add
      local.tee 1
      local.get 5
      f32.demote_f64
      f32.store offset=12
      local.get 1
      local.get 4
      f32.demote_f64
      f32.store offset=8
      local.get 1
      local.get 3
      f32.demote_f64
      f32.store offset=4
      local.get 1
      local.get 2
      f32.demote_f64
      f32.store
    end)
  (func (;114;) (type 26) (param i32 i32 f64 f64 f64 f64)
    block  ;; label = @1
      local.get 1
      i32.const 3
      i32.gt_u
      br_if 0 (;@1;)
      local.get 0
      local.get 1
      i32.const 2
      i32.shl
      i32.add
      local.tee 1
      local.get 5
      f32.demote_f64
      f32.store offset=48
      local.get 1
      local.get 4
      f32.demote_f64
      f32.store offset=32
      local.get 1
      local.get 3
      f32.demote_f64
      f32.store offset=16
      local.get 1
      local.get 2
      f32.demote_f64
      f32.store
    end)
  (func (;115;) (type 1) (param i32)
    (local i32)
    local.get 0
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 56
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 48
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 40
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 32
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 24
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 16
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    i64.const 0
    i64.store align=4
    i32.const -5
    local.set 1
    loop  ;; label = @1
      local.get 0
      i32.const 1065353216
      i32.store
      local.get 0
      i32.const 20
      i32.add
      local.set 0
      local.get 1
      i32.const 5
      i32.add
      local.tee 1
      i32.const 11
      i32.lt_u
      br_if 0 (;@1;)
    end)
  (func (;116;) (type 14) (param i32 f64)
    (local i32 i32)
    i32.const 0
    local.set 2
    loop  ;; label = @1
      local.get 0
      local.get 2
      i32.add
      local.tee 3
      local.get 3
      f32.load
      f64.promote_f32
      local.get 1
      f64.mul
      f32.demote_f64
      f32.store
      local.get 2
      i32.const 4
      i32.add
      local.tee 2
      i32.const 64
      i32.ne
      br_if 0 (;@1;)
    end)
  (func (;117;) (type 1) (param i32)
    (local i32 i32 i32 i32 i32)
    i32.const 0
    local.set 1
    i32.const 0
    i64.const 0
    i64.store offset=1152 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1144 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1136 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1128 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1120 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1112 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1104 align=4
    i32.const 0
    i64.const 0
    i64.store offset=1096 align=4
    i32.const 1096
    local.set 2
    local.get 0
    local.set 3
    loop  ;; label = @1
      i32.const 0
      local.set 4
      local.get 3
      local.set 5
      loop  ;; label = @2
        local.get 2
        local.get 4
        i32.add
        local.get 5
        f32.load
        f32.store
        local.get 5
        i32.const 16
        i32.add
        local.set 5
        local.get 4
        i32.const 4
        i32.add
        local.tee 4
        i32.const 16
        i32.ne
        br_if 0 (;@2;)
      end
      local.get 2
      i32.const 16
      i32.add
      local.set 2
      local.get 3
      i32.const 4
      i32.add
      local.set 3
      local.get 1
      i32.const 1
      i32.add
      local.tee 1
      i32.const 4
      i32.ne
      br_if 0 (;@1;)
    end
    local.get 0
    i32.const 56
    i32.add
    i32.const 0
    i64.load offset=1152 align=4
    i64.store align=4
    local.get 0
    i32.const 48
    i32.add
    i32.const 0
    i64.load offset=1144 align=4
    i64.store align=4
    local.get 0
    i32.const 40
    i32.add
    i32.const 0
    i64.load offset=1136 align=4
    i64.store align=4
    local.get 0
    i32.const 32
    i32.add
    i32.const 0
    i64.load offset=1128 align=4
    i64.store align=4
    local.get 0
    i32.const 24
    i32.add
    i32.const 0
    i64.load offset=1120 align=4
    i64.store align=4
    local.get 0
    i32.const 16
    i32.add
    i32.const 0
    i64.load offset=1112 align=4
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    i32.const 0
    i64.load offset=1104 align=4
    i64.store align=4
    local.get 0
    i32.const 0
    i64.load offset=1096 align=4
    i64.store align=4)
  (func (;118;) (type 25) (param i32) (result f32)
    (local f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32 f32)
    local.get 0
    f32.load offset=32
    local.get 0
    f32.load offset=52
    local.tee 1
    local.get 0
    f32.load offset=8
    local.tee 2
    local.get 0
    f32.load offset=28
    local.tee 3
    f32.mul
    local.get 0
    f32.load offset=12
    local.tee 4
    local.get 0
    f32.load offset=24
    local.tee 5
    f32.mul
    f32.sub
    local.tee 6
    f32.mul
    local.get 0
    f32.load offset=4
    local.tee 7
    local.get 5
    local.get 0
    f32.load offset=60
    local.tee 8
    f32.mul
    local.get 3
    local.get 0
    f32.load offset=56
    local.tee 9
    f32.mul
    f32.sub
    local.tee 10
    f32.mul
    local.get 2
    local.get 8
    f32.mul
    local.get 4
    local.get 9
    f32.mul
    f32.sub
    local.tee 11
    local.get 0
    f32.load offset=20
    local.tee 12
    f32.mul
    f32.sub
    f32.add
    f32.mul
    local.get 0
    f32.load
    local.get 1
    local.get 5
    local.get 0
    f32.load offset=44
    local.tee 13
    f32.mul
    local.get 3
    local.get 0
    f32.load offset=40
    local.tee 5
    f32.mul
    f32.sub
    local.tee 14
    f32.mul
    local.get 12
    local.get 5
    local.get 8
    f32.mul
    local.get 13
    local.get 9
    f32.mul
    f32.sub
    local.tee 8
    f32.mul
    local.get 10
    local.get 0
    f32.load offset=36
    local.tee 3
    f32.mul
    f32.sub
    f32.add
    f32.mul
    local.get 1
    local.get 2
    local.get 13
    f32.mul
    local.get 4
    local.get 5
    f32.mul
    f32.sub
    local.tee 2
    f32.mul
    local.get 7
    local.get 8
    f32.mul
    local.get 11
    local.get 3
    f32.mul
    f32.sub
    f32.add
    local.get 0
    f32.load offset=16
    f32.mul
    f32.sub
    f32.add
    local.get 0
    f32.load offset=48
    local.get 3
    local.get 6
    f32.mul
    local.get 7
    local.get 14
    f32.mul
    local.get 2
    local.get 12
    f32.mul
    f32.sub
    f32.add
    f32.mul
    f32.sub)
  (func (;119;) (type 8) (param i32 i32)
    (local i32 i32 i32 i32 i32 i32 i32 f32 f32 f32 f32 f32 f32 f32 f32)
    i32.const 0
    local.get 0
    i64.load align=4
    i64.store offset=1096 align=4
    i32.const 0
    local.get 0
    i32.const 56
    i32.add
    local.tee 2
    i64.load align=4
    i64.store offset=1152 align=4
    i32.const 0
    local.get 0
    i32.const 48
    i32.add
    local.tee 3
    i64.load align=4
    i64.store offset=1144 align=4
    i32.const 0
    local.get 0
    i32.const 40
    i32.add
    local.tee 4
    i64.load align=4
    i64.store offset=1136 align=4
    i32.const 0
    local.get 0
    i32.const 32
    i32.add
    local.tee 5
    i64.load align=4
    i64.store offset=1128 align=4
    i32.const 0
    local.get 0
    i32.const 24
    i32.add
    local.tee 6
    i64.load align=4
    i64.store offset=1120 align=4
    i32.const 0
    local.get 0
    i32.const 16
    i32.add
    local.tee 7
    i64.load align=4
    i64.store offset=1112 align=4
    i32.const 0
    local.get 0
    i32.const 8
    i32.add
    local.tee 8
    i64.load align=4
    i64.store offset=1104 align=4
    local.get 0
    i32.const 0
    f32.load offset=1144
    local.get 1
    f32.load offset=12
    f32.mul
    i32.const 0
    f32.load offset=1128
    local.get 1
    f32.load offset=8
    f32.mul
    i32.const 0
    f32.load offset=1096
    local.get 1
    f32.load
    f32.mul
    i32.const 0
    f32.load offset=1112
    local.get 1
    f32.load offset=4
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1148
    local.get 1
    f32.load offset=12
    f32.mul
    i32.const 0
    f32.load offset=1132
    local.get 1
    f32.load offset=8
    f32.mul
    i32.const 0
    f32.load offset=1100
    local.get 1
    f32.load
    f32.mul
    i32.const 0
    f32.load offset=1116
    local.get 1
    f32.load offset=4
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=4
    local.get 8
    i32.const 0
    f32.load offset=1152
    local.get 1
    f32.load offset=12
    f32.mul
    i32.const 0
    f32.load offset=1136
    local.get 1
    f32.load offset=8
    f32.mul
    i32.const 0
    f32.load offset=1104
    local.get 1
    f32.load
    f32.mul
    i32.const 0
    f32.load offset=1120
    local.get 1
    f32.load offset=4
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1156
    local.get 1
    f32.load offset=12
    f32.mul
    i32.const 0
    f32.load offset=1140
    local.get 1
    f32.load offset=8
    f32.mul
    i32.const 0
    f32.load offset=1108
    local.get 1
    f32.load
    f32.mul
    i32.const 0
    f32.load offset=1124
    local.get 1
    f32.load offset=4
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=12
    local.get 7
    i32.const 0
    f32.load offset=1144
    local.get 1
    f32.load offset=28
    f32.mul
    i32.const 0
    f32.load offset=1128
    local.get 1
    f32.load offset=24
    f32.mul
    i32.const 0
    f32.load offset=1096
    local.tee 9
    local.get 1
    f32.load offset=16
    f32.mul
    i32.const 0
    f32.load offset=1112
    local.get 1
    f32.load offset=20
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1148
    local.get 1
    f32.load offset=28
    f32.mul
    i32.const 0
    f32.load offset=1132
    local.get 1
    f32.load offset=24
    f32.mul
    i32.const 0
    f32.load offset=1100
    local.tee 10
    local.get 1
    f32.load offset=16
    f32.mul
    i32.const 0
    f32.load offset=1116
    local.get 1
    f32.load offset=20
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=20
    local.get 6
    i32.const 0
    f32.load offset=1152
    local.get 1
    f32.load offset=28
    f32.mul
    i32.const 0
    f32.load offset=1136
    local.get 1
    f32.load offset=24
    f32.mul
    i32.const 0
    f32.load offset=1104
    local.tee 11
    local.get 1
    f32.load offset=16
    f32.mul
    i32.const 0
    f32.load offset=1120
    local.get 1
    f32.load offset=20
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1156
    local.get 1
    f32.load offset=28
    f32.mul
    i32.const 0
    f32.load offset=1140
    local.get 1
    f32.load offset=24
    f32.mul
    i32.const 0
    f32.load offset=1108
    local.tee 12
    local.get 1
    f32.load offset=16
    f32.mul
    i32.const 0
    f32.load offset=1124
    local.get 1
    f32.load offset=20
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=28
    local.get 5
    i32.const 0
    f32.load offset=1144
    local.get 1
    f32.load offset=44
    f32.mul
    i32.const 0
    f32.load offset=1128
    local.get 1
    f32.load offset=40
    f32.mul
    local.get 9
    local.get 1
    f32.load offset=32
    f32.mul
    i32.const 0
    f32.load offset=1112
    local.tee 13
    local.get 1
    f32.load offset=36
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1148
    local.get 1
    f32.load offset=44
    f32.mul
    i32.const 0
    f32.load offset=1132
    local.get 1
    f32.load offset=40
    f32.mul
    local.get 10
    local.get 1
    f32.load offset=32
    f32.mul
    i32.const 0
    f32.load offset=1116
    local.tee 14
    local.get 1
    f32.load offset=36
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=36
    local.get 4
    i32.const 0
    f32.load offset=1152
    local.get 1
    f32.load offset=44
    f32.mul
    i32.const 0
    f32.load offset=1136
    local.get 1
    f32.load offset=40
    f32.mul
    local.get 11
    local.get 1
    f32.load offset=32
    f32.mul
    i32.const 0
    f32.load offset=1120
    local.tee 15
    local.get 1
    f32.load offset=36
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1156
    local.get 1
    f32.load offset=44
    f32.mul
    i32.const 0
    f32.load offset=1140
    local.get 1
    f32.load offset=40
    f32.mul
    local.get 12
    local.get 1
    f32.load offset=32
    f32.mul
    i32.const 0
    f32.load offset=1124
    local.tee 16
    local.get 1
    f32.load offset=36
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=44
    local.get 3
    i32.const 0
    f32.load offset=1144
    local.get 1
    f32.load offset=60
    f32.mul
    i32.const 0
    f32.load offset=1128
    local.get 1
    f32.load offset=56
    f32.mul
    local.get 9
    local.get 1
    f32.load offset=48
    f32.mul
    local.get 13
    local.get 1
    f32.load offset=52
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1148
    local.get 1
    f32.load offset=60
    f32.mul
    i32.const 0
    f32.load offset=1132
    local.get 1
    f32.load offset=56
    f32.mul
    local.get 10
    local.get 1
    f32.load offset=48
    f32.mul
    local.get 14
    local.get 1
    f32.load offset=52
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=52
    local.get 2
    i32.const 0
    f32.load offset=1152
    local.get 1
    f32.load offset=60
    f32.mul
    i32.const 0
    f32.load offset=1136
    local.get 1
    f32.load offset=56
    f32.mul
    local.get 11
    local.get 1
    f32.load offset=48
    f32.mul
    local.get 15
    local.get 1
    f32.load offset=52
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store
    local.get 0
    i32.const 0
    f32.load offset=1156
    local.get 1
    f32.load offset=60
    f32.mul
    i32.const 0
    f32.load offset=1140
    local.get 1
    f32.load offset=56
    f32.mul
    local.get 12
    local.get 1
    f32.load offset=48
    f32.mul
    local.get 16
    local.get 1
    f32.load offset=52
    f32.mul
    f32.add
    f32.add
    f32.add
    f32.store offset=60)
  (func (;120;) (type 13) (param i32 f64 f64 f64)
    (local i32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 1
        f64.const 0x0p+0 (;=0;)
        f64.ne
        br_if 0 (;@2;)
        local.get 2
        f64.const 0x0p+0 (;=0;)
        f64.ne
        br_if 0 (;@2;)
        local.get 3
        f64.const 0x0p+0 (;=0;)
        f64.eq
        br_if 1 (;@1;)
      end
      i32.const 0
      local.get 0
      i64.load align=4
      i64.store offset=1096 align=4
      i32.const 0
      local.get 0
      i32.const 16
      i32.add
      i64.load align=4
      i64.store offset=1112 align=4
      i32.const 0
      local.get 0
      i32.const 32
      i32.add
      i64.load align=4
      i64.store offset=1128 align=4
      i32.const 0
      local.get 0
      i32.const 48
      i32.add
      local.tee 4
      i64.load align=4
      i64.store offset=1144 align=4
      i32.const 0
      local.get 0
      i32.const 56
      i32.add
      local.tee 5
      i64.load align=4
      i64.store offset=1152 align=4
      i32.const 0
      local.get 0
      i32.const 40
      i32.add
      i64.load align=4
      i64.store offset=1136 align=4
      i32.const 0
      local.get 0
      i32.const 24
      i32.add
      i64.load align=4
      i64.store offset=1120 align=4
      i32.const 0
      local.get 0
      i32.const 8
      i32.add
      i64.load align=4
      i64.store offset=1104 align=4
      local.get 4
      local.get 3
      i32.const 0
      f32.load offset=1128
      f64.promote_f32
      f64.mul
      local.get 1
      i32.const 0
      f32.load offset=1096
      f64.promote_f32
      f64.mul
      i32.const 0
      f32.load offset=1112
      f64.promote_f32
      local.get 2
      f64.mul
      f64.add
      f64.add
      i32.const 0
      f32.load offset=1144
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store
      local.get 0
      local.get 3
      i32.const 0
      f32.load offset=1132
      f64.promote_f32
      f64.mul
      local.get 1
      i32.const 0
      f32.load offset=1100
      f64.promote_f32
      f64.mul
      i32.const 0
      f32.load offset=1116
      f64.promote_f32
      local.get 2
      f64.mul
      f64.add
      f64.add
      i32.const 0
      f32.load offset=1148
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store offset=52
      local.get 5
      local.get 3
      i32.const 0
      f32.load offset=1136
      f64.promote_f32
      f64.mul
      local.get 1
      i32.const 0
      f32.load offset=1104
      f64.promote_f32
      f64.mul
      i32.const 0
      f32.load offset=1120
      f64.promote_f32
      local.get 2
      f64.mul
      f64.add
      f64.add
      i32.const 0
      f32.load offset=1152
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store
      local.get 0
      local.get 3
      i32.const 0
      f32.load offset=1140
      f64.promote_f32
      f64.mul
      local.get 1
      i32.const 0
      f32.load offset=1108
      f64.promote_f32
      f64.mul
      i32.const 0
      f32.load offset=1124
      f64.promote_f32
      local.get 2
      f64.mul
      f64.add
      f64.add
      i32.const 0
      f32.load offset=1156
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store offset=60
    end)
  (func (;121;) (type 14) (param i32 f64)
    (local i32 i32 f32 f32)
    block  ;; label = @1
      local.get 1
      f64.const 0x0p+0 (;=0;)
      f64.eq
      br_if 0 (;@1;)
      i32.const 0
      i64.const 0
      i64.store offset=1216 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1208 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1200 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1192 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1184 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1176 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1168 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1160 align=4
      i32.const -5
      local.set 2
      i32.const 1160
      local.set 3
      loop  ;; label = @2
        local.get 3
        i32.const 1065353216
        i32.store
        local.get 3
        i32.const 20
        i32.add
        local.set 3
        local.get 2
        i32.const 5
        i32.add
        local.tee 2
        i32.const 11
        i32.lt_u
        br_if 0 (;@2;)
      end
      i32.const 0
      local.get 1
      call 3
      f32.demote_f64
      local.tee 4
      f32.store offset=1200
      i32.const 0
      local.get 1
      call 2
      f32.demote_f64
      local.tee 5
      f32.store offset=1184
      i32.const 0
      local.get 4
      f32.store offset=1180
      i32.const 0
      local.get 5
      f32.neg
      f32.store offset=1196
      local.get 0
      i32.const 1160
      call 119
    end)
  (func (;122;) (type 14) (param i32 f64)
    (local i32 i32 f32 f32)
    block  ;; label = @1
      local.get 1
      f64.const 0x0p+0 (;=0;)
      f64.eq
      br_if 0 (;@1;)
      i32.const 0
      i64.const 0
      i64.store offset=1216 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1208 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1200 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1192 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1184 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1176 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1168 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1160 align=4
      i32.const -5
      local.set 2
      i32.const 1160
      local.set 3
      loop  ;; label = @2
        local.get 3
        i32.const 1065353216
        i32.store
        local.get 3
        i32.const 20
        i32.add
        local.set 3
        local.get 2
        i32.const 5
        i32.add
        local.tee 2
        i32.const 11
        i32.lt_u
        br_if 0 (;@2;)
      end
      i32.const 0
      local.get 1
      call 3
      f32.demote_f64
      local.tee 4
      f32.store offset=1200
      i32.const 0
      local.get 1
      call 2
      f32.demote_f64
      local.tee 5
      f32.store offset=1192
      i32.const 0
      local.get 4
      f32.store offset=1160
      i32.const 0
      local.get 5
      f32.neg
      f32.store offset=1168
      local.get 0
      i32.const 1160
      call 119
    end)
  (func (;123;) (type 14) (param i32 f64)
    (local i32 i32 f32 f32)
    block  ;; label = @1
      local.get 1
      f64.const 0x0p+0 (;=0;)
      f64.eq
      br_if 0 (;@1;)
      i32.const 0
      i64.const 0
      i64.store offset=1216 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1208 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1200 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1192 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1184 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1176 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1168 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1160 align=4
      i32.const -5
      local.set 2
      i32.const 1160
      local.set 3
      loop  ;; label = @2
        local.get 3
        i32.const 1065353216
        i32.store
        local.get 3
        i32.const 20
        i32.add
        local.set 3
        local.get 2
        i32.const 5
        i32.add
        local.tee 2
        i32.const 11
        i32.lt_u
        br_if 0 (;@2;)
      end
      i32.const 0
      local.get 1
      call 3
      f32.demote_f64
      local.tee 4
      f32.store offset=1180
      i32.const 0
      local.get 1
      call 2
      f32.demote_f64
      local.tee 5
      f32.store offset=1164
      i32.const 0
      local.get 4
      f32.store offset=1160
      i32.const 0
      local.get 5
      f32.neg
      f32.store offset=1176
      local.get 0
      i32.const 1160
      call 119
    end)
  (func (;124;) (type 13) (param i32 f64 f64 f64)
    (local i32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 1
        f64.const 0x1p+0 (;=1;)
        f64.ne
        br_if 0 (;@2;)
        local.get 2
        f64.const 0x1p+0 (;=1;)
        f64.ne
        br_if 0 (;@2;)
        local.get 3
        f64.const 0x1p+0 (;=1;)
        f64.eq
        br_if 1 (;@1;)
      end
      i32.const 0
      i64.const 0
      i64.store offset=1216 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1208 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1200 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1192 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1184 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1176 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1168 align=4
      i32.const 0
      i64.const 0
      i64.store offset=1160 align=4
      i32.const -5
      local.set 4
      i32.const 1160
      local.set 5
      loop  ;; label = @2
        local.get 5
        i32.const 1065353216
        i32.store
        local.get 5
        i32.const 20
        i32.add
        local.set 5
        local.get 4
        i32.const 5
        i32.add
        local.tee 4
        i32.const 11
        i32.lt_u
        br_if 0 (;@2;)
      end
      i32.const 0
      local.get 3
      f32.demote_f64
      f32.store offset=1200
      i32.const 0
      local.get 2
      f32.demote_f64
      f32.store offset=1180
      i32.const 0
      local.get 1
      f32.demote_f64
      f32.store offset=1160
      local.get 0
      i32.const 1160
      call 119
    end)
  (func (;125;) (type 18) (param f64 f64 f64 f64) (result i32)
    (local i32)
    i32.const 24
    call 0
    local.tee 4
    local.get 3
    f32.demote_f64
    f32.store offset=12
    local.get 4
    local.get 2
    f32.demote_f64
    f32.store offset=8
    local.get 4
    local.get 1
    f32.demote_f64
    f32.store offset=4
    local.get 4
    local.get 0
    f32.demote_f64
    f32.store
    local.get 4
    local.get 1
    local.get 3
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=20
    local.get 4
    local.get 0
    local.get 2
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=16
    local.get 4)
  (func (;126;) (type 19) (param i32 f64 f64 f64 f64)
    local.get 0
    local.get 4
    f32.demote_f64
    f32.store offset=12
    local.get 0
    local.get 3
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 2
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 1
    f32.demote_f64
    f32.store
    local.get 0
    local.get 2
    local.get 4
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=20
    local.get 0
    local.get 1
    local.get 3
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=16)
  (func (;127;) (type 27) (param f64 f64 i32) (result i32)
    (local i32)
    i32.const 24
    call 0
    local.tee 3
    i64.const 0
    i64.store align=4
    local.get 3
    i32.const 16
    i32.add
    i64.const 0
    i64.store align=4
    local.get 3
    i32.const 8
    i32.add
    i64.const 0
    i64.store align=4
    block  ;; label = @1
      local.get 2
      br_if 0 (;@1;)
      local.get 3
      f64.const 0x0p+0 (;=0;)
      local.get 1
      f64.const 0x1p-1 (;=0.5;)
      f64.mul
      local.tee 1
      f64.sub
      f32.demote_f64
      f32.store offset=4
      local.get 3
      f64.const 0x0p+0 (;=0;)
      local.get 0
      f64.const 0x1p-1 (;=0.5;)
      f64.mul
      local.tee 0
      f64.sub
      f32.demote_f64
      f32.store
    end
    local.get 3
    local.get 1
    f64.const 0x0p+0 (;=0;)
    f64.add
    f32.demote_f64
    f32.store offset=12
    local.get 3
    local.get 0
    f64.const 0x0p+0 (;=0;)
    f64.add
    f32.demote_f64
    f32.store offset=8
    local.get 3)
  (func (;128;) (type 28) (param i32 f64 f64 i32 i32)
    (local f64)
    block  ;; label = @1
      local.get 4
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      local.get 0
      f32.load offset=4
      f32.sub
      f64.promote_f32
      local.get 2
      f64.mul
      local.set 2
      local.get 0
      f32.load offset=8
      local.get 0
      f32.load
      f32.sub
      f64.promote_f32
      local.get 1
      f64.mul
      local.set 1
    end
    block  ;; label = @1
      block  ;; label = @2
        local.get 3
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        local.get 1
        local.get 0
        f32.load
        f64.promote_f32
        f64.add
        f32.demote_f64
        f32.store offset=8
        local.get 2
        local.get 0
        f32.load offset=4
        f64.promote_f32
        f64.add
        local.set 1
        br 1 (;@1;)
      end
      local.get 0
      local.get 0
      f32.load offset=16
      f64.promote_f32
      local.tee 5
      local.get 1
      f64.const 0x1p-1 (;=0.5;)
      f64.mul
      local.tee 1
      f64.sub
      f32.demote_f64
      f32.store
      local.get 0
      local.get 1
      local.get 5
      f64.add
      f32.demote_f64
      f32.store offset=8
      local.get 0
      local.get 0
      f32.load offset=20
      f64.promote_f32
      local.tee 1
      local.get 2
      f64.const 0x1p-1 (;=0.5;)
      f64.mul
      local.tee 2
      f64.sub
      f32.demote_f64
      f32.store offset=4
      local.get 2
      local.get 1
      f64.add
      local.set 1
    end
    local.get 0
    local.get 1
    f32.demote_f64
    f32.store offset=12)
  (func (;129;) (type 0) (param i32) (result i32)
    local.get 0)
  (func (;130;) (type 1) (param i32)
    local.get 0
    call 1)
  (func (;131;) (type 0) (param i32) (result i32)
    (local f32 f32 f32 f32)
    local.get 0
    f32.load
    local.set 1
    local.get 0
    f32.load offset=4
    local.set 2
    local.get 0
    f32.load offset=8
    local.set 3
    local.get 0
    f32.load offset=12
    local.set 4
    i32.const 24
    call 0
    local.tee 0
    local.get 4
    f32.store offset=12
    local.get 0
    local.get 3
    f32.store offset=8
    local.get 0
    local.get 2
    f32.store offset=4
    local.get 0
    local.get 1
    f32.store
    local.get 0
    local.get 2
    f64.promote_f32
    local.get 4
    f64.promote_f32
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=20
    local.get 0
    local.get 1
    f64.promote_f32
    local.get 3
    f64.promote_f32
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=16
    local.get 0)
  (func (;132;) (type 1) (param i32)
    local.get 0
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 16
    i32.add
    i64.const 0
    i64.store align=4
    local.get 0
    i32.const 8
    i32.add
    i64.const 0
    i64.store align=4)
  (func (;133;) (type 1) (param i32)
    local.get 0
    i64.const 9187343241974906880
    i64.store offset=16 align=4
    local.get 0
    i64.const 9187343241974906880
    i64.store align=4
    local.get 0
    i64.const 9187343241974906880
    i64.store offset=8 align=4)
  (func (;134;) (type 7) (param i32 f64 f64)
    (local f64)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        f64.promote_f32
        local.tee 3
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.eq
        br_if 0 (;@2;)
        local.get 3
        local.get 1
        f64.gt
        i32.eqz
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 1
      f32.demote_f64
      f32.store
    end
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        f64.promote_f32
        local.tee 3
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.eq
        br_if 0 (;@2;)
        local.get 3
        local.get 2
        f64.gt
        i32.eqz
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 2
      f32.demote_f64
      f32.store offset=4
    end
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=8
        f64.promote_f32
        local.tee 3
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.eq
        br_if 0 (;@2;)
        local.get 3
        local.get 1
        f64.lt
        i32.eqz
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 1
      f32.demote_f64
      f32.store offset=8
    end
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=12
        f64.promote_f32
        local.tee 1
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.eq
        br_if 0 (;@2;)
        local.get 1
        local.get 2
        f64.lt
        i32.eqz
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 2
      f32.demote_f64
      f32.store offset=12
    end
    local.get 0
    local.get 0
    f32.load
    local.get 0
    f32.load offset=8
    f32.add
    f32.const 0x1p-1 (;=0.5;)
    f32.mul
    f32.store offset=16
    local.get 0
    local.get 0
    f32.load offset=4
    local.get 0
    f32.load offset=12
    f32.add
    f32.const 0x1p-1 (;=0.5;)
    f32.mul
    f32.store offset=20)
  (func (;135;) (type 8) (param i32 i32)
    (local f32 f32 f32)
    local.get 1
    f32.load offset=4
    local.set 2
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 3
        local.get 1
        f32.load
        local.tee 4
        f32.gt
        br_if 0 (;@2;)
        local.get 3
        f64.promote_f32
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.ne
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 4
      f32.store
    end
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        local.tee 3
        local.get 2
        f32.gt
        br_if 0 (;@2;)
        local.get 3
        f64.promote_f32
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.ne
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 2
      f32.store offset=4
    end
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=8
        local.tee 3
        local.get 4
        f32.lt
        br_if 0 (;@2;)
        local.get 3
        f64.promote_f32
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.ne
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 4
      f32.store offset=8
    end
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=12
        local.tee 4
        local.get 2
        f32.lt
        br_if 0 (;@2;)
        local.get 4
        f64.promote_f32
        f64.const 0x1.fffffffffffffp+1023 (;=1.79769e+308;)
        f64.ne
        br_if 1 (;@1;)
      end
      local.get 0
      local.get 2
      f32.store offset=12
    end
    local.get 0
    local.get 0
    f32.load
    local.get 0
    f32.load offset=8
    f32.add
    f32.const 0x1p-1 (;=0.5;)
    f32.mul
    f32.store offset=16
    local.get 0
    local.get 0
    f32.load offset=4
    local.get 0
    f32.load offset=12
    f32.add
    f32.const 0x1p-1 (;=0.5;)
    f32.mul
    f32.store offset=20)
  (func (;136;) (type 7) (param i32 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=12
    local.get 0
    local.get 0
    f32.load offset=16
    f64.promote_f32
    local.get 1
    f64.add
    f32.demote_f64
    f32.store offset=16
    local.get 0
    local.get 0
    f32.load offset=20
    f64.promote_f32
    local.get 2
    f64.add
    f32.demote_f64
    f32.store offset=20)
  (func (;137;) (type 8) (param i32 i32)
    (local f32 f32)
    local.get 0
    local.get 1
    f32.load
    local.tee 2
    local.get 0
    f32.load
    f32.add
    f32.store
    local.get 0
    local.get 1
    f32.load offset=4
    local.tee 3
    local.get 0
    f32.load offset=4
    f32.add
    f32.store offset=4
    local.get 0
    local.get 2
    local.get 0
    f32.load offset=8
    f32.add
    f32.store offset=8
    local.get 0
    local.get 3
    local.get 0
    f32.load offset=12
    f32.add
    f32.store offset=12
    local.get 0
    local.get 2
    local.get 0
    f32.load offset=16
    f32.add
    f32.store offset=16
    local.get 0
    local.get 3
    local.get 0
    f32.load offset=20
    f32.add
    f32.store offset=20)
  (func (;138;) (type 29) (param i32 f64 f64 i32)
    (local f32 f64 f64)
    block  ;; label = @1
      local.get 3
      i32.eqz
      br_if 0 (;@1;)
      local.get 2
      local.get 0
      f32.load offset=12
      local.get 0
      f32.load offset=4
      local.tee 4
      f32.sub
      f64.promote_f32
      f64.mul
      local.get 4
      f64.promote_f32
      f64.add
      local.set 2
      local.get 1
      local.get 0
      f32.load offset=8
      local.get 0
      f32.load
      local.tee 4
      f32.sub
      f64.promote_f32
      f64.mul
      local.get 4
      f64.promote_f32
      f64.add
      local.set 1
    end
    local.get 0
    local.get 1
    local.get 0
    f32.load offset=16
    f64.promote_f32
    local.tee 5
    f64.sub
    local.tee 1
    local.get 0
    f32.load
    f64.promote_f32
    f64.add
    f32.demote_f64
    f32.store
    local.get 0
    local.get 2
    local.get 0
    f32.load offset=20
    f64.promote_f32
    local.tee 6
    f64.sub
    local.tee 2
    local.get 0
    f32.load offset=4
    f64.promote_f32
    f64.add
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 1
    local.get 0
    f32.load offset=8
    f64.promote_f32
    f64.add
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 2
    local.get 0
    f32.load offset=12
    f64.promote_f32
    f64.add
    f32.demote_f64
    f32.store offset=12
    local.get 0
    local.get 2
    local.get 6
    f64.add
    f32.demote_f64
    f32.store offset=20
    local.get 0
    local.get 1
    local.get 5
    f64.add
    f32.demote_f64
    f32.store offset=16)
  (func (;139;) (type 8) (param i32 i32)
    (local f32 f32 f32 f32)
    local.get 0
    local.get 1
    f32.load offset=12
    local.tee 2
    f32.store offset=12
    local.get 0
    local.get 1
    f32.load offset=8
    local.tee 3
    f32.store offset=8
    local.get 0
    local.get 1
    f32.load offset=4
    local.tee 4
    f32.store offset=4
    local.get 0
    local.get 1
    f32.load
    local.tee 5
    f32.store
    local.get 0
    local.get 4
    f64.promote_f32
    local.get 2
    f64.promote_f32
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=20
    local.get 0
    local.get 5
    f64.promote_f32
    local.get 3
    f64.promote_f32
    f64.add
    f64.const 0x1p-1 (;=0.5;)
    f64.mul
    f32.demote_f64
    f32.store offset=16)
  (func (;140;) (type 20) (param i32 f64 f64 f64 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 5
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f64.promote_f32
      local.get 3
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.get 4
      f64.eq
      local.set 5
    end
    local.get 5)
  (func (;141;) (type 10) (param i32 i32) (result i32)
    (local i32)
    i32.const 0
    local.set 2
    block  ;; label = @1
      local.get 0
      f32.load
      local.get 1
      f32.load
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      local.get 1
      f32.load offset=8
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      local.get 1
      f32.load offset=4
      f32.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      local.get 1
      f32.load offset=12
      f32.eq
      local.set 2
    end
    local.get 2)
  (func (;142;) (type 20) (param i32 f64 f64 f64 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 5
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      call 4
      local.get 1
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      call 4
      local.get 2
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f64.promote_f32
      local.get 3
      call 5
      local.get 3
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.get 4
      call 5
      local.get 4
      f64.eq
      local.set 5
    end
    local.get 5)
  (func (;143;) (type 10) (param i32 i32) (result i32)
    (local i32 f64 f32 f32)
    i32.const 0
    local.set 2
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f32.load
      f64.promote_f32
      local.tee 3
      call 4
      local.get 3
      f64.ne
      br_if 0 (;@1;)
      local.get 1
      f32.load offset=12
      local.set 4
      local.get 1
      f32.load offset=8
      local.set 5
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 1
      f32.load offset=4
      f64.promote_f32
      local.tee 3
      call 4
      local.get 3
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f64.promote_f32
      local.get 5
      f64.promote_f32
      local.tee 3
      call 5
      local.get 3
      f64.ne
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.get 4
      f64.promote_f32
      local.tee 3
      call 5
      local.get 3
      f64.eq
      local.set 2
    end
    local.get 2)
  (func (;144;) (type 11) (param i32 f64 f64 f64) (result i32)
    (local i32)
    i32.const 0
    local.set 4
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 3
      f64.sub
      local.get 1
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f64.promote_f32
      local.get 3
      f64.add
      local.get 1
      f64.ge
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 3
      f64.sub
      local.get 2
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.get 3
      f64.add
      local.get 2
      f64.ge
      local.set 4
    end
    local.get 4)
  (func (;145;) (type 12) (param i32 i32 f64) (result i32)
    (local i32 f64)
    i32.const 0
    local.set 3
    block  ;; label = @1
      local.get 0
      f32.load
      f64.promote_f32
      local.get 2
      f64.sub
      local.get 1
      f32.load
      f64.promote_f32
      local.tee 4
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=8
      f64.promote_f32
      local.get 2
      f64.add
      local.get 4
      f64.ge
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      f64.sub
      local.get 1
      f32.load offset=4
      f64.promote_f32
      local.tee 4
      f64.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.get 2
      f64.add
      local.get 4
      f64.ge
      local.set 3
    end
    local.get 3)
  (func (;146;) (type 19) (param i32 f64 f64 f64 f64)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    call 5
    f32.demote_f64
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    call 5
    f32.demote_f64
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 3
    call 4
    f32.demote_f64
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 4
    call 4
    f32.demote_f64
    f32.store offset=12)
  (func (;147;) (type 8) (param i32 i32)
    local.get 0
    local.get 0
    f32.load
    local.get 1
    f32.load
    call 6
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    call 6
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    local.get 1
    f32.load offset=8
    call 7
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    local.get 1
    f32.load offset=12
    call 7
    f32.store offset=12)
  (func (;148;) (type 20) (param i32 f64 f64 f64 f64) (result i32)
    (local f32)
    local.get 0
    f32.load offset=8
    local.set 5
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    call 4
    local.set 1
    local.get 5
    f64.promote_f32
    local.get 3
    call 5
    local.set 3
    local.get 0
    f32.load offset=12
    local.set 5
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    call 4
    local.set 2
    local.get 5
    f64.promote_f32
    local.get 4
    call 5
    local.get 2
    f64.sub
    f64.const 0x0p+0 (;=0;)
    call 4
    local.get 3
    local.get 1
    f64.sub
    f64.const 0x0p+0 (;=0;)
    call 4
    f64.mul
    f64.const 0x0p+0 (;=0;)
    f64.gt)
  (func (;149;) (type 10) (param i32 i32) (result i32)
    (local f32 f32 f32)
    local.get 0
    f32.load
    local.get 1
    f32.load
    call 7
    local.set 2
    local.get 0
    f32.load offset=8
    local.get 1
    f32.load offset=8
    call 6
    local.set 3
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    call 7
    local.set 4
    local.get 0
    f32.load offset=12
    local.get 1
    f32.load offset=12
    call 6
    f64.promote_f32
    local.get 4
    f64.promote_f32
    f64.sub
    f64.const 0x0p+0 (;=0;)
    call 4
    local.get 3
    f64.promote_f32
    local.get 2
    f64.promote_f32
    f64.sub
    f64.const 0x0p+0 (;=0;)
    call 4
    f64.mul
    f64.const 0x0p+0 (;=0;)
    f64.gt)
  (func (;150;) (type 20) (param i32 f64 f64 f64 f64) (result i32)
    (local f32 f32 f32 f32)
    local.get 0
    local.get 0
    f32.load
    f64.promote_f32
    local.get 1
    call 4
    f32.demote_f64
    local.tee 5
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f64.promote_f32
    local.get 2
    call 4
    f32.demote_f64
    local.tee 6
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f64.promote_f32
    local.get 3
    call 5
    f32.demote_f64
    local.tee 7
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f64.promote_f32
    local.get 4
    call 5
    f32.demote_f64
    local.tee 8
    f32.store offset=12
    local.get 8
    local.get 6
    f32.sub
    f64.promote_f32
    f64.const 0x0p+0 (;=0;)
    call 4
    local.get 7
    local.get 5
    f32.sub
    f64.promote_f32
    f64.const 0x0p+0 (;=0;)
    call 4
    f64.mul
    f64.const 0x0p+0 (;=0;)
    f64.gt)
  (func (;151;) (type 10) (param i32 i32) (result i32)
    (local f32 f32 f32 f32)
    local.get 0
    local.get 0
    f32.load
    local.get 1
    f32.load
    call 7
    local.tee 2
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    local.get 1
    f32.load offset=4
    call 7
    local.tee 3
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    local.get 1
    f32.load offset=8
    call 6
    local.tee 4
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    local.get 1
    f32.load offset=12
    call 6
    local.tee 5
    f32.store offset=12
    local.get 5
    local.get 3
    f32.sub
    f64.promote_f32
    f64.const 0x0p+0 (;=0;)
    call 4
    local.get 4
    local.get 2
    f32.sub
    f64.promote_f32
    f64.const 0x0p+0 (;=0;)
    call 4
    f64.mul
    f64.const 0x0p+0 (;=0;)
    f64.gt)
  (func (;152;) (type 29) (param i32 f64 f64 i32)
    (local f64)
    block  ;; label = @1
      block  ;; label = @2
        local.get 3
        i32.eqz
        br_if 0 (;@2;)
        local.get 0
        local.get 0
        f32.load offset=8
        f64.promote_f32
        local.get 1
        f64.add
        f32.demote_f64
        f32.store offset=8
        local.get 0
        i32.const 12
        i32.add
        local.set 3
        local.get 0
        f32.load offset=12
        f64.promote_f32
        local.set 1
        br 1 (;@1;)
      end
      local.get 0
      local.get 0
      f32.load
      f64.promote_f32
      local.get 1
      f64.const 0x1p-1 (;=0.5;)
      f64.mul
      local.tee 4
      f64.sub
      f32.demote_f64
      f32.store
      local.get 0
      local.get 0
      f32.load offset=4
      f64.promote_f32
      local.get 2
      f64.const 0x1p-1 (;=0.5;)
      f64.mul
      local.tee 1
      f64.sub
      f32.demote_f64
      f32.store offset=4
      local.get 0
      local.get 4
      local.get 0
      f32.load offset=8
      f64.promote_f32
      f64.add
      f32.demote_f64
      f32.store offset=8
      local.get 0
      i32.const 12
      i32.add
      local.set 3
      local.get 0
      f32.load offset=12
      f64.promote_f32
      local.set 2
    end
    local.get 3
    local.get 1
    local.get 2
    f64.add
    f32.demote_f64
    f32.store)
  (func (;153;) (type 17) (param i32) (result f64)
    local.get 0
    f32.load offset=8
    local.get 0
    f32.load
    f32.sub
    f64.promote_f32)
  (func (;154;) (type 17) (param i32) (result f64)
    local.get 0
    f32.load offset=12
    local.get 0
    f32.load offset=4
    f32.sub
    f64.promote_f32)
  (func (;155;) (type 0) (param i32) (result i32)
    (local i32)
    i32.const 0
    local.set 1
    block  ;; label = @1
      local.get 0
      f32.load
      local.get 0
      f32.load offset=8
      f32.le
      i32.eqz
      br_if 0 (;@1;)
      local.get 0
      f32.load offset=4
      local.get 0
      f32.load offset=12
      f32.le
      local.set 1
    end
    local.get 1)
  (func (;156;) (type 16) (param i32 i32) (result f64)
    (local f32 f32 f32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 1
        i32.eqz
        br_if 0 (;@2;)
        f32.const 0x0p+0 (;=0;)
        local.set 2
        local.get 0
        f32.load
        local.tee 3
        local.get 0
        f32.load offset=8
        local.tee 4
        f32.le
        i32.eqz
        br_if 1 (;@1;)
        local.get 0
        f32.load offset=4
        local.get 0
        f32.load offset=12
        f32.le
        i32.eqz
        br_if 1 (;@1;)
        local.get 4
        local.get 3
        f32.sub
        local.get 0
        f32.load offset=12
        local.get 0
        f32.load offset=4
        f32.sub
        f32.mul
        f64.promote_f32
        return
      end
      local.get 0
      f32.load offset=12
      local.get 0
      f32.load offset=4
      f32.sub
      local.get 0
      f32.load offset=8
      local.get 0
      f32.load
      f32.sub
      f32.mul
      local.set 2
    end
    local.get 2
    f64.promote_f32)
  (func (;157;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.floor
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.floor
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f32.floor
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f32.floor
    f32.store offset=12
    local.get 0
    local.get 0
    f32.load offset=16
    f32.floor
    f32.store offset=16
    local.get 0
    local.get 0
    f32.load offset=20
    f32.floor
    f32.store offset=20)
  (func (;158;) (type 1) (param i32)
    local.get 0
    local.get 0
    f32.load
    f32.ceil
    f32.store
    local.get 0
    local.get 0
    f32.load offset=4
    f32.ceil
    f32.store offset=4
    local.get 0
    local.get 0
    f32.load offset=8
    f32.ceil
    f32.store offset=8
    local.get 0
    local.get 0
    f32.load offset=12
    f32.ceil
    f32.store offset=12
    local.get 0
    local.get 0
    f32.load offset=16
    f32.ceil
    f32.store offset=16
    local.get 0
    local.get 0
    f32.load offset=20
    f32.ceil
    f32.store offset=20)
  (func (;159;) (type 1) (param i32)
    (local f32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=4
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=8
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=8
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=12
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=12
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=16
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=16
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=20
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 2
    f32.convert_i32_s
    f32.store offset=20)
  (func (;160;) (type 1) (param i32)
    (local f32 i32)
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=4
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=4
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=8
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=8
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=12
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=12
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=16
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=16
    block  ;; label = @1
      block  ;; label = @2
        local.get 0
        f32.load offset=20
        local.tee 1
        f32.abs
        f32.const 0x1p+31 (;=2.14748e+09;)
        f32.lt
        i32.eqz
        br_if 0 (;@2;)
        local.get 1
        i32.trunc_f32_s
        local.set 2
        br 1 (;@1;)
      end
      i32.const -2147483648
      local.set 2
    end
    local.get 0
    local.get 1
    local.get 2
    f32.convert_i32_s
    f32.sub
    f32.store offset=20)
  (global (;0;) (mut i32) (i32.const 66768))
  (export "vec2_alloc2f" (func 9))
  (export "vec2_materialize" (func 10))
  (export "vec2_dtor" (func 11))
  (export "vec2_clone" (func 12))
  (export "vec2_set2f" (func 13))
  (export "vec2_set1v" (func 14))
  (export "vec2_zero" (func 15))
  (export "vec2_iszero" (func 16))
  (export "vec2_equals2f" (func 17))
  (export "vec2_equals1v" (func 18))
  (export "vec2_almost2f" (func 19))
  (export "vec2_almost1v" (func 20))
  (export "vec2_neg" (func 21))
  (export "vec2_inv" (func 22))
  (export "vec2_abs" (func 23))
  (export "vec2_translate2f" (func 24))
  (export "vec2_translate1v" (func 25))
  (export "vec2_rotate3f" (func 26))
  (export "vec2_add2f" (func 27))
  (export "vec2_add1v" (func 28))
  (export "vec2_sub2f" (func 29))
  (export "vec2_sub1v" (func 30))
  (export "vec2_scale1f" (func 31))
  (export "vec2_scale2f" (func 32))
  (export "vec2_scale1v" (func 33))
  (export "vec2_floor" (func 34))
  (export "vec2_ceil" (func 35))
  (export "vec2_trunc" (func 36))
  (export "vec2_fract" (func 37))
  (export "vec2_dot2f" (func 38))
  (export "vec2_dot1v" (func 39))
  (export "vec2_mag2" (func 40))
  (export "vec2_mag" (func 41))
  (export "vec2_unit" (func 42))
  (export "vec2_major" (func 43))
  (export "vec2_minor" (func 44))
  (export "vec2_sign" (func 45))
  (export "vec4_alloc4f" (func 46))
  (export "vec4_materialize" (func 47))
  (export "vec4_dtor" (func 48))
  (export "vec4_clone" (func 49))
  (export "vec4_set4f" (func 50))
  (export "vec4_set1v" (func 51))
  (export "vec4_zero" (func 52))
  (export "vec4_iszero" (func 53))
  (export "vec4_equals4f" (func 54))
  (export "vec4_equals2f" (func 55))
  (export "vec4_equals1v" (func 56))
  (export "vec4_almost4f" (func 57))
  (export "vec4_almost2f" (func 58))
  (export "vec4_almost1v" (func 59))
  (export "vec4_neg" (func 60))
  (export "vec4_inv" (func 61))
  (export "vec4_abs" (func 62))
  (export "vec4_translate4f" (func 63))
  (export "vec4_translate2f" (func 64))
  (export "vec4_translate1v" (func 65))
  (export "vec4_add4f" (func 66))
  (export "vec4_add2f" (func 67))
  (export "vec4_add1v" (func 68))
  (export "vec4_sub4f" (func 69))
  (export "vec4_sub2f" (func 70))
  (export "vec4_sub1v" (func 71))
  (export "vec4_scale4f" (func 72))
  (export "vec4_scale2f" (func 73))
  (export "vec4_scale1f" (func 74))
  (export "vec4_scale1v" (func 75))
  (export "vec4_floor" (func 76))
  (export "vec4_ceil" (func 77))
  (export "vec4_trunc" (func 78))
  (export "vec4_fract" (func 79))
  (export "vec4_dot4f" (func 80))
  (export "vec4_dot2f" (func 81))
  (export "vec4_dot1v" (func 82))
  (export "vec4_mag2" (func 83))
  (export "vec4_mag" (func 84))
  (export "vec4_unit" (func 85))
  (export "vec4_major" (func 86))
  (export "vec4_minor" (func 87))
  (export "vec4_sign" (func 88))
  (export "mat3_alloc" (func 89))
  (export "mat3_materialize" (func 90))
  (export "mat3_dtor" (func 91))
  (export "mat3_clone" (func 92))
  (export "mat3_set1m" (func 93))
  (export "mat3_fill1f" (func 94))
  (export "mat3_set1f" (func 95))
  (export "mat3_col1i3f" (func 96))
  (export "mat3_row1i3f" (func 97))
  (export "mat3_identity" (func 98))
  (export "mat3_scale1f" (func 99))
  (export "mat3_transpose" (func 100))
  (export "mat3_det" (func 101))
  (export "mat3_append1m" (func 102))
  (export "mat3_translate2f" (func 103))
  (export "mat3_rotate1f" (func 104))
  (export "mat3_scale2f" (func 105))
  (export "mat4_alloc" (func 106))
  (export "mat4_materialize" (func 107))
  (export "mat4_dtor" (func 108))
  (export "mat4_clone" (func 109))
  (export "mat4_set1m" (func 110))
  (export "mat4_fill1f" (func 111))
  (export "mat4_set1f" (func 112))
  (export "mat4_col1i4f" (func 113))
  (export "mat4_row1i4f" (func 114))
  (export "mat4_identity" (func 115))
  (export "mat4_scale1f" (func 116))
  (export "mat4_transpose" (func 117))
  (export "mat4_det" (func 118))
  (export "mat4_append1m" (func 119))
  (export "mat4_translate3f" (func 120))
  (export "mat4_rotateX" (func 121))
  (export "mat4_rotateY" (func 122))
  (export "mat4_rotateZ" (func 123))
  (export "mat4_scale3f" (func 124))
  (export "rect_alloc4f" (func 125))
  (export "rect_set4f" (func 126))
  (export "rect_alloc2f" (func 127))
  (export "rect_resize" (func 128))
  (export "rect_materialize" (func 129))
  (export "rect_dtor" (func 130))
  (export "rect_clone" (func 131))
  (export "rect_zero" (func 132))
  (export "rect_reset" (func 133))
  (export "rect_extend2f" (func 134))
  (export "rect_extend1v" (func 135))
  (export "rect_translate2f" (func 136))
  (export "rect_translate1v" (func 137))
  (export "rect_center" (func 138))
  (export "rect_set1r" (func 139))
  (export "rect_equals4f" (func 140))
  (export "rect_equals1r" (func 141))
  (export "rect_contains4f" (func 142))
  (export "rect_contains1r" (func 143))
  (export "rect_contains2f" (func 144))
  (export "rect_contains1v" (func 145))
  (export "rect_union4f" (func 146))
  (export "rect_union1r" (func 147))
  (export "rect_intersects4f" (func 148))
  (export "rect_intersects1r" (func 149))
  (export "rect_intersection4f" (func 150))
  (export "rect_intersection1r" (func 151))
  (export "rect_resizeBy" (func 152))
  (export "rect_width" (func 153))
  (export "rect_height" (func 154))
  (export "rect_isRight" (func 155))
  (export "rect_area" (func 156))
  (export "rect_floor" (func 157))
  (export "rect_ceil" (func 158))
  (export "rect_trunc" (func 159))
  (export "rect_fract" (func 160))
  (start 8))
